# react-native-multiple-tags
Multiple Select using Tags


Demo
<p align="left">
   <img src="img/gif_1.gif" width="45%" />
   <img src="img/gif_2.gif" width="45%" />
   <img src="img/img-2.png" width="45%" />
   <img src="img/img-1.png" width="45%" />
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
        Text,
} from 'react-native';
import MultipleTags from 'react-native-multiple-tags';


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
      <View>
        <MultipleTags
          tags={tags}
          search
          onChangeItem={(content) => { this.setState({ content }); }}
          title="Fruits"
        />
        {
        (() => this.state.content.map(item => <Text key={item}> {item} </Text>) )()
        }
      </View>
    );
  }
}

export default WelcomeComponent;     
```

## Props
---
| Prop        | Required   | Types | Purpose  |
| --- |---| ---|---|
| tags      | Yes | array | List of tags/items to display for selection. |
| preselectedTags      | No | array | List of tags/items to be selected on default. tags must be plain array in javascript check example above. |
| search      | No      | boolean |  set search to false to hide the search bar. |
| onChangeItem | Yes      | function | JavaScript function passed in as an argument. This function is called whenever items are added or removed in the component. |
| title | No | string | The Name or Category of tags. |
| iconAddName | No | string | Name of icon to be used instead of the regular +, icon name must be of Ionicons in react-native-vector-icons |
| searchHitResponse | No | string | Text to display when search query hits nothing. |
| defaultInstructionClosed | No | string | Text to instruct users what to do when closed |
| defaultTotalRenderedTags | No | number | Total number of tags to show or render, default is 30
| defaultInstructionOpen | No | string | Text to instruct users what to do when opened |
| sizeIconTag | No | number |  Size Icon of add (plus) item. |
| showIconAdd | No | boolean | Set false if you want hide the Add Icon. |
| labelActiveTag | No | object | Custom style for active tag label. |
| tagActiveStyle | No | object |  Custom style for active tag. |
| visibleOnOpen | No | boolean | 



# Todo

- [ ] Supports array of objects.


PR's are welcome
