import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import QuestionComponent from './QuestionComponent';
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
    if(this.state.currentPage == this.props.questions.length - 1) {
      this.props.onPagerEnd();
      return
    }
    this.viewPager.current.setPage(this.state.currentPage+1);
  }

  render() {
    const { questions, onChoiceSelected, showAnswerOnNext, startTimeMs } = this.props;
    return (
      <ViewPager
      ref={this.viewPager}
      style={styles.viewPager}
      initialPage={this.state.initialPage}
      onPageSelected={this.handlePageChange}
      scrollEnabled={false}
      >
         {questions.map((q, i) => {
            return (
              <View key={i}>
               <Text style={styles.pageNumber}>{this.state.currentPage+1}/20</Text>
               <QuestionComponent question={q} setChoice={(text) => {
                 onChoiceSelected(i, text);
               }} 
               toPrevPage={this.toPrevPage} 
               toNextPage={this.toNextPage} 
               showAnswerOnNext = {showAnswerOnNext}
              />
             </View>
            )
         })}
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
  pageNumber: {
    textAlign: 'center'
  }
});

