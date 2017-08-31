import React, { Component } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  body: {
    flex: 1,
    maxHeight: 130,
  },
  showTagsWrapper: {
    minHeight: 40,
    maxHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectTagsWrapper: {
    height: 70,
  },
  tagSearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 3,
    maxHeight: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#d4d5d6',
    marginBottom: 5,
  },
  showTagsContainer: {
    height: 30,
  },
  textInputStyle: {
    flex: 1,
    margin: 0,
    height: 30,
    maxHeight: 30,
    padding: 0,
  },
  iconStyle: {
    flex: 1,
    maxWidth: 20,
    marginRight: 5,
    textAlign: 'center',
  },
  eachTag: {
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: 5,
    alignItems: 'center',
    borderColor: '#d7d8d9',
  },
  eachTagIcon: {
    color: '#676869',
    marginLeft: 5,
  },
  eachTagIconAdd: {
    color: '#676869',
    marginRight: 5,
  },
  showAvailTagsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showAvailTagsViewNotFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  showEachAvailTags: {
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: 5,
    alignItems: 'center',
    borderColor: '#d7d8d9',
    marginBottom: 2,
    marginTop: 2,
  },
  notFoundStyle: {
    fontSize: 14,
    fontWeight: '500',
  },
  textActionBtn: {
    maxHeight: 20,
    flexDirection: 'row',
  },
  btnAction: {
    lineHeight: 20,
    justifyContent: 'flex-start',
    marginLeft: 5,
  },

};

const {
  body,
  showTagsWrapper,
  selectTagsWrapper,
  tagSearchWrapper,
  showTagsContainer,
  textInputStyle,
  iconStyle,
  textActionBtn,
  btnAction,
  eachTagIconAdd,
  eachTag,
  eachTagIcon,
  showAvailTagsView,
  showEachAvailTags,
  notFoundStyle,
  showAvailTagsViewNotFound,
} = styles;


class MultipleTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      searchFilterTag: [],
      selectedTag: [],
      previousCharacter: '',
      show: false,
    };
  }

  componentWillMount() {
    this.setAvailableTags(this.props.tags);
  }

  setAvailableTags(tags) {
    this.tags = tags;
    this.setState({
      tags: this.tags,
      searchFilterTag: this.tags,
    });
  }

  setTagsBasedOnQuery(xhracter = '') {
    this.newValue = xhracter;
    this.setState({
      previousCharacter: this.newValue,
    });
  }

  setOnChangeValue() {
    this.props.onChangeItem(this.state.selectedTag);
  }

  addTag(item) {
    this.selectedTag = this.state.selectedTag;
    this.tags = this.state.tags;
    this.arr = this.state.searchFilterTag.filter(value => value !== item);
    this.setState({
      searchFilterTag: this.arr,
      selectedTag: [item, ...this.selectedTag],
    }, this.setOnChangeValue);
  }

  removeTag(item) {
    this.selectedTag = this.state.selectedTag.filter(value => value !== item);
    this.searchFilterTag = this.state.searchFilterTag;
    this.setState({
      selectedTag: this.selectedTag,
      searchFilterTag: [item, ...this.searchFilterTag],
    }, this.setOnChangeValue);
  }

  showAvailableTags() {
    const { selectCompletedMessage } = this.props;
    this.newValue = this.state.previousCharacter;
    this.filteredTags = [];
    this.selectedTag = this.state.selectedTag;
    this.state.tags.map((item) => {
      if (item.includes(this.newValue)) {
        if (!this.selectedTag.includes(item)) {
          this.filteredTags.push(item);
        }
      }
      return this.filteredTags;
    });
    this.searchFilterTag = this.filteredTags;
    if (typeof this.searchFilterTag[this.searchFilterTag.length - 1] !== 'undefined') {
      const AvailableTags = this.searchFilterTag.map(item =>
        (
          <TouchableOpacity
            key={item}
            style={showEachAvailTags}
            onPress={() => this.addTag(item)}
          >
            <Text style={eachTagIconAdd} >
              <Icon name="ios-add-circle-outline" size={15} />
            </Text>
            <Text>{ item } </Text>
          </TouchableOpacity>
        ));

      return (
        <View style={showAvailTagsView}>
          {AvailableTags}
        </View>
      );
    }

    return (
      <View style={showAvailTagsViewNotFound}>
        <Text style={notFoundStyle}>{ selectCompletedMessage } </Text>
      </View>
    );
  }

  showSelectedTags() {
    const { defaultMessage } = this.props;
    this.selectedTag = this.state.selectedTag;
    if (typeof this.selectedTag[this.selectedTag.length - 1] !== 'undefined') {
      const SelectedTags = this.selectedTag.map(item =>
        (
          <TouchableOpacity
            key={item}
            style={eachTag}
            onPress={() => this.removeTag(item)}
          >
            <Text>{item}</Text>
            <Text style={eachTagIcon} >
              <Icon name="ios-trash-outline" size={15} />
            </Text>
          </TouchableOpacity>
        ));

      return SelectedTags;
    }

    return (
      <View style={showAvailTagsViewNotFound}>
        <Text style={notFoundStyle}>{ this.state.show ? 'pick a tag with the + icon' : defaultMessage } </Text>
      </View>
    );
  }

  changeVisibility() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { search, title } = this.props;
    return (
      <View style={body}>
        <View style={textActionBtn}>
          <Text> {title} </Text>
          <Text
            onPress={() => this.changeVisibility()}
            style={btnAction}
          >
            <Icon
              style={iconStyle}
              size={20}
              name={this.state.show ? 'ios-arrow-dropup-outline' : 'ios-arrow-dropdown-outline'}
            />
          </Text>
        </View>
        <View style={showTagsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.showSelectedTags()}
          </ScrollView>
        </View>
        {
          !this.state.show || (
            <View style={selectTagsWrapper}>
              {
                !search || (
                  this.state.searchFilterTag.length === 0 || (
                    <View style={tagSearchWrapper}>
                      <TextInput
                        style={textInputStyle}
                        value={this.state.previousCharacter}
                        underlineColorAndroid="transparent"
                        onChangeText={value => this.setTagsBasedOnQuery(value)}
                        placeholder="Search"
                      />
                      <Icon style={iconStyle} size={20} name="ios-search-outline" />
                    </View>
                  )
                )
              }

              {
                this.state.searchFilterTag.length === 0 || (
                  <View style={showTagsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {this.showAvailableTags()}
                    </ScrollView>
                  </View>
                )
              }
            </View>
          )
        }
      </View>
    );
  }
}

MultipleTags.propTypes = {
  tags: PropTypes.array.isRequired,
  onChangeItem: PropTypes.func.isRequired,
  search: PropTypes.bool,
  title: PropTypes.string,
  defaultMessage: PropTypes.string,
  selectCompletedMessage: PropTypes.string,
};

MultipleTags.defaultProps = {
  search: true,
  title: 'Tags',
  selectCompletedMessage: 'No match was found',
  defaultMessage: 'Press the down arrow button to pick a tag',
};

export default MultipleTags;
