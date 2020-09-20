import React, { useState } from 'react';
import QuestionPager from '../components/QuestionPager';
import { StyleSheet, View } from 'react-native';
import QuestionResultComponent from '../components/QuestionResultComponent';
import TimerComponent from '../components/TimerComponent';


export default SessionScreen = ({session, onQuestionChoiceChange, onCurrentQuestionChange, onSessionEnd, showAnswerOnNext}) => { 
  const [showResult, setShowResult] = useState(false);
  const handleChoiceSelected = (index, text) => {
    onQuestionChoiceChange(index, text);
  }
  const handlePageChange = (page) => {
    onCurrentQuestionChange(page);
  }
  const handlePagerEnd = () => {
    onSessionEnd();
    setShowResult(true);
  }
  let timerStartTime = Date.now();
  if (session.questions[session.currentQuestionIndex] && session.questions[session.currentQuestionIndex].startTime) {
    timerStartTime = session.questions[session.currentQuestionIndex].startTime;
  }
  let timerBaseDur = 0;
  for (let i=0;i<session.currentQuestionIndex;i++) {
    timerBaseDur += session.questions[i].endTime - session.questions[i].startTime;
  }

  return (
    <View style={styles.container}>
       {!showResult &&
       <View style={styles.pagerContainer}>
         <TimerComponent style={styles.timer} startTimeMs={timerStartTime} baseDuration={timerBaseDur}/>
         <QuestionPager style={styles.pager}
        questions={session.questions}
        startTime={session.startTime}
        initialPage={session.currentQuestionIndex ? session.currentQuestionIndex : 0}
        onChoiceSelected={handleChoiceSelected}
        onPageChange={handlePageChange}
        onPagerEnd={handlePagerEnd}
        showAnswerOnNext={showAnswerOnNext} />
        </View>}
      {
        showResult && <QuestionResultComponent questions={session.questions} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerContainer: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  timer: {

  }
});