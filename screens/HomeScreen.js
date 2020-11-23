import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import _ from "lodash";
import { Card } from "react-native-elements";
import { getData } from "../data";
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import iap from "../iap/iap";
//import { getUniqueId } from "react-native-device-info";

export default function HomeScreen({ navigation }) {
  const [sampleProgress, setSampleProgress] = useState({});
  const [c01Progress, setC01Progress] = useState({});
  const [c02Progress, setC02Progress] = useState({});
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    initIAP().then(() => {
      resetPurchaseStatus();
    });
    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProgress("sample", 20).then((p) => setSampleProgress(p));
      getProgress("c02", 466).then((p) => setC02Progress(p));
      getProgress("c01", 1185).then((p) => setC01Progress(p));
      return () => {};
    }, [])
  );

  const initIAP = async () => {
    await iap.init();
    await iap.setUserId('1');
    await iap.getActiveProducts();
    await iap.getProductsForSale();
    console.log('>>>>>>>iap', iap.activeProducts, iap.isInitialized, iap.productsForSale, iap.skuProcessing);
  };

  const resetPurchaseStatus = () => {
    let bundle = _.filter(
      iap.activeProducts,
      (p) => p.sku === "saa-c02-bundle"
    );
    setPurchased(!_.isEmpty(bundle));
  };

  const getProgress = (examVersion, total) => {
    let key = `@${examVersion}_progress`;
    return getData(key).then((v) => {
      let progress = { total: total, learned: 0, mistakes: 0 };
      if (!v) {
        return progress;
      }
      let wrongNum = Object.values(v).filter((i) => i.status === "wrong")
        .length;
      let correctNum = Object.values(v).filter((i) => i.status === "correct")
        .length;
      progress.learned = correctNum;
      progress.mistakes = wrongNum;
      return progress;
    });
  };

  const progressToBarData = (progress) => {
    let data = [];
    if (!progress || !progress.total) {
      return data;
    }
    let v1 = (progress.learned / progress.total) * 100;
    if (v1) {
      if (v1 < 1) {
        v1 = 1;
      }
      data.push({ value: v1, color: "#49CFAE" });
    }
    let v2 = (progress.mistakes / progress.total) * 100;
    if (v2) {
      if (v2 < 1) {
        v2 = 1;
      }
      data.push({ value: v2, color: "#EC5563" });
    }
    data.push({ value: 100 - v1 - v2, color: "#C2C0C0" });
    return data;
  };

  const onStudyPressed = (examVersion) => {
    navigation.navigate("Study", { examVersion });
  };

  const onTestPressed = (examVersion) => {
    navigation.navigate("TestMenu", { examVersion });
  };

  const UnpurchasedHome = () => {
    return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.cardTitle}>
            <Text style={styles.textFont}>Sample</Text>
            <Text style={styles.total}>
              Total {sampleProgress ? sampleProgress.total : 0} Questions
            </Text>
          </View>
          <View style={styles.barStyle}>
            <ProgressBar data={progressToBarData(sampleProgress)} />
            <View style={styles.barText}>
              <Text style={{ marginRight: 10 }}>
                Learned: {sampleProgress.learned}
              </Text>
              <Text>Mistakes: {sampleProgress.mistakes}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onStudyPressed("sample");
              }}
            >
              <Text style={styles.text}>Study</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onTestPressed("sample");
              }}
            >
              <Text style={styles.text}>Test</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Button
            buttonStyle={{
              paddingBottom: 20,
              backgroundColor: "transparent",
            }}
            icon={<Icon name="lock" size={16} color="#6C6C6C" />}
            onPress={() => onLockerClick}
          />
          <View style={styles.cardTitle}>
            <Text style={styles.textFont}>SAA-C02</Text>
            <Text style={styles.total}>Total 466 Questions</Text>
          </View>
          <View style={styles.barStyle}>
            <ProgressBar data={progressToBarData({ total: 466, learned: 0, mistakes: 0 })} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Study</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Test</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.cardTitle}>
            <Text style={styles.textFont}>SAA-C01</Text>
            <Text style={styles.total}>Total 1148 Questions</Text>
          </View>
          <View style={styles.barStyle}>
            <ProgressBar data={progressToBarData({ total: 1148, learned: 0, mistakes: 0 })} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Study</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Test</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hello, Good Morning</Text>
      {!purchased && UnpurchasedHome()}
      {purchased && (
        <View>
          <Card containerStyle={styles.cardContainer}>
            <View style={styles.cardTitle}>
              <Text style={styles.textFont}>SAA-C02</Text>
              <Text style={styles.total}>
                Total {c02Progress ? c02Progress.total : 0} Questions
              </Text>
            </View>
            <View style={styles.barStyle}>
              <ProgressBar data={progressToBarData(c02Progress)} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onStudyPressed("c02");
                }}
              >
                <Text style={styles.text}>Study</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onTestPressed("c02");
                }}
              >
                <Text style={styles.text}>Test</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine} />
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View style={styles.cardTitle}>
              <Text style={styles.textFont}>SAA-C01</Text>
              <Text style={styles.total}>
                Total {c01Progress ? c01Progress.total : 0} Questions
              </Text>
            </View>
            <View style={styles.barStyle}>
              <ProgressBar data={progressToBarData(c01Progress)} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onStudyPressed("c01");
                }}
              >
                <Text style={styles.text}>Study</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onTestPressed("c01");
                }}
              >
                <Text style={styles.text}>Test</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    backgroundColor: "#ffffff",
  },

  cardContainer: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#C2C0C0",
    shadowOpacity: 0.3,
    backgroundColor: "#FAFAFB",
    elevation: 3,
    borderRadius: 10,
    borderColor: "#FAFAFB",
  },

  barStyle: {
    height: 30,
    width: "100%",
    marginTop: "2%",
    marginBottom: "5%",
    borderRadius: 5,
  },

  titleText: {
    paddingLeft: "5%",
    fontSize: 18,
    marginTop: "5%",
    fontFamily: "Avenir-Book",
  },

  buttonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    flexBasis: "45%",
    alignItems: "center",
    backgroundColor: "#F1BC5E",
    borderRadius: 2,
    padding: 12,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#C2C0C0",
    shadowOpacity: 0.2,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  textFont: {
    fontFamily: "Avenir-Medium",
    fontSize: 16,
  },
  total: {
    fontFamily: "Avenir-Black",
    color: "#4A4949",
    fontSize: 12,
  },

  horizontalLine: {
    borderBottomColor: "#CECECE",
    borderBottomWidth: 1,
    marginTop: "5%",
    marginBottom: "5%",
  },
  barText: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});
