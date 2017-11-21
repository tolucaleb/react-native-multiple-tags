# react-native-multiple-tags
Multiple Select using Tags


Demo
<p align="left">
   <img src="img/gif_1.gif" width="48%" />
   <img src="img/gif_2.gif" width="48%" />
</p>

# Installation
```s
npm i -S react-native-multiple-tags
```

# Usage


```js

import React, { Component } from 'react';
import {
        View,
        StatusBar,
        ScrollView,
        Text,
} from 'react-native';
import MultipleTags from 'react-native-multiple-tags';

const styles = {
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    padding: 10,
  },
};

const {
  body,
 } = styles;

const tags = [
  'cherry',
  'mango',
  'cashew',
  'almond',
  'guava',
  'pineapple',
  'orange',
  'pear',
  'date',
  'strawberry',
  'pawpaw',
  'banana',
  'apple',
  'grape',
  'lemon',
];


class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  render() {
    return (

      <View style={body}>
        <StatusBar
          translucent
          backgroundColor="rgba(0,0,0,0.1)"
          barStyle="light-content"
        />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <MultipleTags
              tags={tags}
              search
              onChangeItem={(content) => { this.setState({ content }); }}
              title="Fruits"
            />
            {
            (() => {
              const textComponents = this.state.content.map(item => <Text> {item} </Text>);
              return textComponents;
            })()
        }
          </View>
        </ScrollView>
      </View>


    );
  }
}

export default WelcomeComponent;     
```

## Props

| Prop        | Required   | Purpose  |
| ------------- |-------------| -----|
| tags      | Yes | List of tags/items to display for selection. tags must be plain array in javascript check example above. |
| search      | No      |   set search to false to hide the search bar |
| onChangeItem | Yes      |JavaScript function passed in as an argument. This function is called whenever items are added or removed in the component |
| title | No | The Name or Category of tags |
| selectCompletedMessage | No | Text to display when search query hits nothing|
| defaultMessage | No |  First Message to instruct what to do,
| sizeIconTag | No |  Size Icon of add (plus) item,
| showIconAdd | No |  Set false if you want hide the Add Icon,
| labelActiveTag | No |  custom style for active tag label,
| tagActiveStyle | No |  custom style for active tag,

# Note
Use this component inside a scrollview for it to maintain its auto height.


# Todo

- [ ] Supports array of objects.


PR's are welcome
