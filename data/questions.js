import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

const questionBundle = {
    "c01": {
        dbFileName: "saa_c01_questions0",
        // react native doesn't recognize .db as assets, use .mp4 here.
        srcURI: Asset.fromModule(require("../assets/data/saa_c01_questions.mp4")).uri,
    }
}

export const loadQuestionDBIfNotExists = async (examVersion) => {
    let dbFileName = questionBundle[examVersion].dbFileName;
    let { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/${dbFileName}.db`);
    if (!exists) {
        console.log("start downdling question db....");
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`, { idempotent: true });
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
        let { status } = await FileSystem.downloadAsync(
            questionBundle[examVersion].srcURI,
            `${FileSystem.documentDirectory}SQLite/${dbFileName}.db`);
        if (status !== 200) {
            throw new Error('failed to download db file');
        }
    }
}

export const pickQuestionsRandomly = async (examVersion, count) => {
    await loadQuestionDBIfNotExists(examVersion);
    let dbFileName = questionBundle[examVersion].dbFileName;

    console.log("querying question db....");
    const db = SQLite.openDatabase(dbFileName + ".db");
    let questions = [];
    db.transaction(tx => {
        tx.executeSql(
            `SELECT data FROM questions ORDER BY RANDOM() LIMIT ?;`,
            [count],
            (_, { rows: { _array } }) => {
                _array.forEach((row) => {
                    let q = rowToQuestion(row.data.replace(/\\/g, ''));
                    questions.push(q);
                });
            },
            (_, err) => {
                throw err;
            },
        );
    });
    return questions;
}

export const questionsByIds = async (examVersion, ids) => {
    await loadQuestionDBIfNotExists(examVersion);
    let dbFileName = questionBundle[examVersion].dbFileName;

    console.log("querying question db....");
    const db = SQLite.openDatabase(dbFileName + ".db");
    let questions = [];
    db.transaction(tx => {
        tx.executeSql(
            `SELECT data FROM questions WHERE id IN (?);`,
            [ids.join()],
            (_, { rows: { _array } }) => {
                _array.forEach((row) => {
                    let q = rowToQuestion(row.data.replace(/\\/g, ''));
                    questions.push(q);
                });
            },
            (_, err) => {
                throw err;
            },
        );
    });
    return questions;
}

export const questionCount = async (examVersion) => {
    await loadQuestionDBIfNotExists(examVersion);
    let dbFileName = questionBundle[examVersion].dbFileName;

    console.log("querying question db....");
    const db = SQLite.openDatabase(dbFileName + ".db");
    return new Promise((res, rej) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT COUNT(*) FROM questions`,
                [],
                (_, { rows: { _array } }) => {
                    _array.forEach((row) => {
                        res(row['COUNT(*)']);    
                    });
                },
                (_, err) => {
                    rej(err);
                },
            );
        });
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export const questionById = (examVersion, id) => {
    return loadQuestionDBIfNotExists(examVersion).then(() => {
        return new Promise((res, rej) => {
            let dbFileName = questionBundle[examVersion].dbFileName;

            console.log("querying question db....");
            const db = SQLite.openDatabase(dbFileName + ".db");
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT data FROM questions WHERE id=?;`,
                    [id],
                    (_, { rows: { _array } }) => {
                        _array.forEach((row) => {
                            q = rowToQuestion(row.data.replace(/\\/g, ''));
                            res(q);
                        });
                    },
                    (_, err) => {
                        rej(err);
                    },
                );
            });
        })
    })
}

export const rowToQuestion = (json) => {
    let raw = JSON.parse(json);
    let correctAnswers = [];
    let wrongAnswers = [];
    Object.entries(raw.choices).forEach(([c, t]) => {
        if (raw.answers.includes(c)) {
            correctAnswers.push(t);
        } else {
            wrongAnswers.push(t);
        }
    })

    return {
        "id": raw.id,
        "text": raw.question_text,
        "explanation": raw.explanation,
        "correctAnswers": correctAnswers,
        "wrongAnswers": wrongAnswers,
    }
}