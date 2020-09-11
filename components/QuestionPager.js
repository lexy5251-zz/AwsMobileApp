import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import ViewPager from '@react-native-community/viewpager';
import QuestionComponent from './QuestionComponent';
import QuestionResultComponent from './QuestionResultComponent';
import TimerComponent from './TimerComponent';

export default class QuestionPager extends React.Component {

  constructor(props) {
    super(props);
    const pages = [];
    for (let i = 0; i < pages; i++) {
      pages.push(createPage(i));
    }

    this.state = {
      currentPage: props.initialPage,
      initialPage: props.initialPage,
    }
    this.viewPager = React.createRef();
  }

  handlePageChange = (e) => {
    this.props.onPageChange(e.nativeEvent.position);  
    this.state.currentPage = e.nativeEvent.position;
  }

  toPrevPage = () => {
    this.viewPager.current.setPage(this.state.currentPage-1);
  }

  toNextPage = () => {
    this.viewPager.current.setPage(this.state.currentPage+1);
  }

  render() {
    const { questions, setChoiceForQuestion, showAnswerOnNext, startTimeMs } = this.props;
    return (
      <ViewPager
      ref={this.viewPager}
      style={styles.viewPager}
      initialPage={this.state.initialPage}
      onPageSelected={this.handlePageChange}
      >
         {questions.map((q, i) => {
            console.log('reder page: ', i);
            return (
              <View key={i}>
               <TimerComponent startTimeMs={startTimeMs} />
               <QuestionComponent question={q} setChoice={(text) => {
                 setChoiceForQuestion(i, text);
               }} 
               toPrevPage={this.toPrevPage} 
               toNextPage={this.toNextPage} 
               showAnswerOnNext = {showAnswerOnNext}
              />
             </View>
            )
         })}
         {/* <QuestionResultComponent questions={questions} /> */}
       </ViewPager>
   );
  }
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

