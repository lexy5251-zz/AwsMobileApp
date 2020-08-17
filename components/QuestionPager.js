import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import ViewPager from '@react-native-community/viewpager';
import QuestionComponent from './QuestionComponent';
import PracticeResult from './PracticeResult';

export default class QuestionPager extends React.Component {

  constructor(props) {
    super(props);
    const pages = [];
    for (let i = 0; i < pages; i++) {
      pages.push(createPage(i));
    }

    this.state = {
      page: 0,
    }

    this.viewPager = React.createRef();
  }

  toPrevPage = () => {
    this.viewPager.current.setPage(this.state.page - 1);
    this.state.page--;
  }

  toNextPage = () => {
    this.viewPager.current.setPage(this.state.page + 1);
    this.state.page++;
  }

  render() {
    const { questions } = this.props;
    return (
      <ViewPager ref={this.viewPager} style={styles.viewPager} initialPage={this.state.page}>
         {Object.entries(questions).map(([id, q], i) => {
            return (
              <View key={i}>
               <QuestionComponent question={q} questionId={id} setChoice={(text) => {
                 setChoiceForQuestion(id, text);
               }} toPrevPage={this.toPrevPage} toNextPage={this.toNextPage} shouldShowAnswerButton={this.props.shouldShowAnswerButton} />
             </View>
            )
         })}
         <PracticeResult />
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

