import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const styles = {
  showTagsWrapper: {
    minHeight: 40,
    maxHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagSearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 0,
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
    textAlignVertical: 'center',
    // backgroundColor: 'blue',
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
    alignItems: 'flex-start',
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
    justifyContent: 'center',
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
  labelActiveTag: {
    fontSize: 14,
  },
};

const {
  showTagsWrapper,
  tagSearchWrapper,
  showTagsContainer,
  textInputStyle,
  iconStyle,
  textActionBtn,
  btnAction,
  labelActiveTag,
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
      totalViewWidth: 0,
      totalIndex: 0,
      object: false,

    };
  }

  componentWillMount() {
    this.setAvailableTags(this.props);
  }

  setAvailableTags({ tags, preselectedTags, objectValueIdentifier, objectKeyIdentifier }) {
    let object = false;
    object = typeof tags[0] === 'object';
    this.defaultTags = preselectedTags
      .map(item => (object ? {
        [objectKeyIdentifier]: item[objectKeyIdentifier],
        [objectValueIdentifier]: item[objectValueIdentifier].toLowerCase(),
      } : item.toLowerCase()));
    this.allTags = tags
      .map(item => (object ? {
        [objectKeyIdentifier]: item[objectKeyIdentifier],
        [objectValueIdentifier]: item[objectValueIdentifier].toLowerCase(),
      } : item.toLowerCase()));
    this.tags = tags
      .map(item => (object ? {
        [objectKeyIdentifier]: item[objectKeyIdentifier],
        [objectValueIdentifier]: item[objectValueIdentifier].toLowerCase(),
      } : item.toLowerCase()));
    this.arr = [];

    this.defaultTags.forEach((item) => {
      if (
        object
          ? this.tags.some(x => x[objectKeyIdentifier] === item[objectKeyIdentifier])
          : this.tags.includes(item)
      ) {
        this.arr.push(item);
      }
    });
    for (let i = 0; i < this.arr.length; i += 1) {
      const item = this.arr[i];
      this.tags = this.tags
        .filter(value => (
          object
            ? value[objectKeyIdentifier] !== item[objectKeyIdentifier]
            : value !== item),
        );
    }

    this.setState({
      tags: this.allTags,
      searchFilterTag: this.tags,
      selectedTag: this.arr,
      object,
      show: this.props.visibleOnOpen,
    }, this.setOnChangeValue);
  }

  setTagsBasedOnQuery(xhracter = '') {
    this.setState({
      previousCharacter: xhracter,
    }, this.scrollToFirstItem);
  }

  setOnChangeValue() {
    this.props.onChangeItem(this.state.selectedTag);
  }

  ucwords(str) {
    return (`${str}`).replace(/^([a-z])|\s+([a-z])/g, $1 => $1.toUpperCase());
  }

  scrollToFirstItem() {
    if (this.showAvailableTagsRef) {
      this.showAvailableTagsRef.scrollToOffset({ offset: 0 });
    }
  }

  eachTagWidth(event, index) {
    if (index) {
      const formerWidth = this.state.totalViewWidth;
      this.setState({
        totalViewWidth: formerWidth + event.nativeEvent.layout.width,
        totalIndex: index,
      });
    } else {
      this.setState({
        totalViewWidth: event.nativeEvent.layout.width,
      });
    }
  }

  addTag(item) {
    const { selectedTag, object, searchFilterTag } = this.state;
    const { objectValueIdentifier } = this.props;


    this.arr = searchFilterTag
      .filter(value => (object
        ? value[objectValueIdentifier] !== item[objectValueIdentifier]
        : value !== item
      ),
      );
    this.setState({
      searchFilterTag: this.arr,
      selectedTag: [item, ...selectedTag],
    }, this.setOnChangeValue);
  }

  removeTag(item) {
    const { objectValueIdentifier } = this.props;
    const { selectedTag, object, searchFilterTag } = this.state;

    this.selectedTag = selectedTag
      .filter(value => (
        object
          ? value[objectValueIdentifier] !== item[objectValueIdentifier]
          : value !== item
      ));

    this.setState({
      selectedTag: this.selectedTag,
      searchFilterTag: [item, ...searchFilterTag],
    }, this.setOnChangeValue);
  }

  showAvailableTags() {
    const { searchHitResponse, defaultTotalRenderedTags, objectValueIdentifier, objectKeyIdentifier } = this.props;
    const { object, tags, selectedTag, previousCharacter } = this.state;
    this.newValue = previousCharacter.toLowerCase();
    this.filteredTags = [];

    tags.map((item) => {
      if (
        object
          ? item[objectValueIdentifier].includes(this.newValue)
          : item.includes(this.newValue)
      ) {
        if (
          object
            ? !selectedTag.some(x => x[objectValueIdentifier] === item[objectValueIdentifier])
            : !selectedTag.includes(item)
        ) {
          if (this.filteredTags.length > defaultTotalRenderedTags) {
            return this.filteredTags;
          }
          this.filteredTags.push(item);
        }
      }
      return this.filteredTags;
    });

    if (this.filteredTags[this.filteredTags.length - 1] !== undefined) {
      return (
        <View style={showAvailTagsView}>
          <FlatList
            ref={ref => this.showAvailableTagsRef = ref}
            horizontal
            data={this.filteredTags}
            extraData={previousCharacter}
            renderItem={data => this.renderItem(data)}
            keyExtractor={data => (object ? data[objectKeyIdentifier] : data)}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => (
              {
                length: width,
                offset: this.state.totalViewHeight + (this.state.totalIndex * 5),
                index,
              }
            )}
          />
        </View>
      );
    }

    return (
      <View style={showAvailTagsViewNotFound}>
        <Text style={notFoundStyle}>{ searchHitResponse } </Text>
      </View>
    );
  }

  showSelectedTags() {
    const { defaultInstructionClosed, defaultInstructionOpen, objectKeyIdentifier } = this.props;
    const { selectedTag, show, object } = this.state;

    if (selectedTag[selectedTag.length - 1] !== undefined) {
      return (
        <FlatList
          horizontal
          data={selectedTag}
          keyExtractor={data => (object ? data[objectKeyIdentifier] : data)}
          renderItem={data => this.renderSelectedItem(data)}
          showsHorizontalScrollIndicator={false}
        />
      );
    }

    return (
      <View style={showAvailTagsViewNotFound}>
        <Text style={notFoundStyle}>
          { show ? defaultInstructionOpen : defaultInstructionClosed }
        </Text>
      </View>
    );
  }

  changeVisibility() {
    this.setState({
      show: !this.state.show,
    });
  }

  renderItem(data) {
    const { item, index } = data;
    const {
      sizeIconTag,
      showIconAdd,
      iconAddName,
      tagActiveStyle,
    } = this.props;
    const { object } = this.state;
    const { objectValueIdentifier } = this.props;

    return (
      <TouchableOpacity
        style={[showEachAvailTags, tagActiveStyle]}
        onLayout={event => this.eachTagWidth(event, index)}
        onPress={() => this.addTag(item)}
      >
        {
          showIconAdd
          &&
          <Text>
            <Icon name={iconAddName} size={sizeIconTag} />
          </Text>
        }
        <Text style={labelActiveTag}> { object ? this.ucwords(item[objectValueIdentifier]) : this.ucwords(item) }</Text>
      </TouchableOpacity>
    );
  }

  renderSelectedItem(data) {
    const { item } = data;
    const { object } = this.state;
    const { objectValueIdentifier } = this.props;
    return (
      <TouchableOpacity
        style={eachTag}
        onPress={() => this.removeTag(item)}
      >
        <Text> { object ? this.ucwords(item[objectValueIdentifier]) : this.ucwords(item) }</Text>
        <Text style={eachTagIcon} >
          <Icon name="ios-trash-outline" size={15} />
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { search, title } = this.props;
    const { show, searchFilterTag, previousCharacter } = this.state;
    return (
      <View>
        <View style={textActionBtn}>
          <Text onPress={() => this.changeVisibility()}>{title} </Text>
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
          {this.showSelectedTags()}
        </View>
        {
          !show || (
            <View>
              {
                !search || (
                  searchFilterTag.length === 0 || (
                    <View style={tagSearchWrapper}>
                      <TextInput
                        style={textInputStyle}
                        value={previousCharacter}
                        underlineColorAndroid="transparent"
                        onChangeText={value => this.setTagsBasedOnQuery(value)}
                        placeholder="search..."
                      />
                      <Icon style={iconStyle} size={15} name="ios-search-outline" />
                    </View>
                  )
                )
              }

              {
                searchFilterTag.length === 0 || (
                  <View style={showTagsContainer}>
                    {this.showAvailableTags()}
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
  preselectedTags: PropTypes.array,
  onChangeItem: PropTypes.func.isRequired,
  search: PropTypes.bool,
  title: PropTypes.string,
  defaultInstructionClosed: PropTypes.string,
  defaultInstructionOpen: PropTypes.string,
  defaultTotalRenderedTags: PropTypes.number,
  searchHitResponse: PropTypes.string,
  sizeIconTag: PropTypes.number,
  showIconAdd: PropTypes.bool,
  iconAddName: PropTypes.string,
  labelActiveTag: PropTypes.object,
  tagActiveStyle: PropTypes.object,
  visibleOnOpen: PropTypes.bool,
  objectValueIdentifier: PropTypes.string,
  objectKeyIdentifier: PropTypes.string,
};

MultipleTags.defaultProps = {
  preselectedTags: [],
  search: true,
  title: 'Tags',
  searchHitResponse: 'No match was found',
  defaultInstructionClosed: 'Press the down arrow button to pick a tag',
  defaultInstructionOpen: 'Pick a tag with the + icon',
  sizeIconTag: 15,
  showIconAdd: true,
  iconAddName: 'ios-add-circle-outline',
  defaultTotalRenderedTags: 30,
  labelActiveTag,
  tagActiveStyle: {},
  visibleOnOpen: false,
  objectValueIdentifier: 'value',
  objectKeyIdentifier: 'key',
};

export default MultipleTags;
