'use strict';
import Exponent from 'exponent';
import React from 'react';
import ReactNative from 'react-native';
const {
  I18nManager,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = ReactNative;
import DrawerLayout from './drawerLayout';

var DrawerLockModeSwitches = React.createClass({
  render: function() {
    const {value, onValueChange} = this.props;

    return (
      <ScrollView style={styles.drawerLock}>
        <View style={[styles.container, styles.split]}>
          <Switch
            onValueChange={value =>
              (value ? onValueChange('unlocked') : onValueChange('unlocked'))}
            value={value === 'unlocked'}
          />
          <Text style={styles.spacedLeft}>Unlocked</Text>
        </View>
        <View style={[styles.container, styles.split]}>
          <Switch
            onValueChange={value =>
              (value
                ? onValueChange('locked-closed')
                : onValueChange('unlocked'))}
            value={value === 'locked-closed'}
          />
          <Text style={styles.spacedLeft}>locked-closed</Text>
        </View>
        <View style={[styles.container, styles.split]}>
          <Switch
            onValueChange={value =>
              (value
                ? onValueChange('locked-open')
                : onValueChange('unlocked'))}
            value={value === 'locked-open'}
          />
          <Text style={styles.spacedLeft}>locked-open</Text>
        </View>
      </ScrollView>
    );
  },
});

var DrawerLayoutExample = React.createClass({
  getInitialState() {
    return {
      drawerLockMode: 'unlocked',
    };
  },

  render: function() {
    const {drawerLockMode} = this.state;

    const navigationView = (
      <View style={[styles.container]}>
        <Text>Hello there!</Text>
        <DrawerLockModeSwitches
          value={drawerLockMode}
          onValueChange={value => this.setState({drawerLockMode: value})}
        />
        <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
          <Text>Close drawer</Text>
        </TouchableHighlight>
      </View>
    );

    return (
      <DrawerLayout
        onDrawerSlide={e =>
          this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={e =>
          this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerBackgroundColor="red"
        drawerWidth={300}
        drawerLockMode={drawerLockMode}
        ref={drawer => {
          return (this.drawer = drawer);
        }}
        keyboardDismissMode="on-drag"
        statusBarBackgroundColor="blue"
        renderNavigationView={() => navigationView}>
        <ScrollView containerStyle={styles.container}>
          <Text style={styles.welcome}>Content!</Text>
          <DrawerLockModeSwitches
            value={drawerLockMode}
            onValueChange={value => this.setState({drawerLockMode: value})}
          />
          <Text>{this.state.drawerStateChangedOutput}</Text>
          <Text>{this.state.drawerSlideOutput}</Text>
          <TouchableHighlight onPress={() => this.drawer.openDrawer()}>
            <Text>Open drawer</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => I18nManager.forceRTL(!I18nManager.isRTL)}>
            <Text>Toggle RTL: {I18nManager.isRTL ? 'yes' : 'no'}</Text>
          </TouchableHighlight>
          <TextInput style={styles.inputField} />
        </ScrollView>
      </DrawerLayout>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputField: {
    backgroundColor: '#F2F2F2',
    height: 40,
  },
  split: {
    flexDirection: 'row',
  },
  spacedLeft: {
    paddingLeft: 10,
  },
  drawerLock: {
    height: 200,
    paddingTop: 50,
  },
});

Exponent.registerRootComponent(DrawerLayoutExample);
