import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { timeFormatter, timeDisplay, toSeconds } from "../helper";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Timer extends Component {
  state = {
    edit_mode: false,
    h: 0,
    m: 0,
    s: 0
  };

  editModeOn = () => {
    this.props.resetTimer();
    const { h, m, s } = timeFormatter(this.props.set_time);
    this.setState({ edit_mode: true, h, m, s });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { h, m, s } = this.state;
    const seconds = toSeconds(h, m, s);
    this.props.setTimer(seconds);
    this.setState({ edit_mode: false });
  };

  render() {
    const {
      remaining_time,
      is_timed,
      startTimer,
      stopTimer,
      resetTimer
    } = this.props;
    const { edit_mode, h, m, s } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.timer}>
          {edit_mode ? (
            <View style={styles.setTimeForm}>
              <TextInput
                value={`${h}`}
                onChangeText={h => this.setState({ h })}
                maxLength={2}
                keyboardType="numeric"
                returnKeyType="done"
                autoFocus
                onSubmitEditing={() => {
                  this._m.focus();
                }}
                blurOnSubmit={false}
                style={styles.input}
              />
              <Text>h</Text>
              <TextInput
                ref={view => {
                  this._m = view;
                }}
                value={`${m}`}
                onChangeText={m => this.setState({ m })}
                maxLength={2}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => {
                  this._s.focus();
                }}
                blurOnSubmit={false}
                style={styles.input}
              />
              <Text>m</Text>
              <TextInput
                ref={view => {
                  this._s = view;
                }}
                value={`${s}`}
                onChangeText={s => this.setState({ s })}
                maxLength={2}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={this.handleFormSubmit}
                style={styles.input}
              />
              <Text>s</Text>
            </View>
          ) : (
            <View style={styles.time}>
              <Text style={styles.remainTime}>
                {timeDisplay(remaining_time)}
              </Text>
              <FontAwesome
                style={styles.editBtn}
                name="edit"
                onPress={this.editModeOn}
                size={20}
              />
            </View>
          )}
          <View style={styles.handles}>
            {is_timed ? (
              <Button
                title="Stop"
                onPress={stopTimer}
                accessibilityLabel="Stop Timer"
                {...(edit_mode ? { disabled: true } : {})}
              />
            ) : (
              <Button
                title="Start"
                onPress={startTimer}
                accessibilityLabel="Start Timer"
                {...(edit_mode ? { disabled: true } : {})}
              />
            )}
            <Button
              title="Reset"
              onPress={resetTimer}
              accessibilityLabel="Reset Timer"
              {...(edit_mode ? { disabled: true } : {})}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  setTimeForm: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  input: {
    width: 20
  },
  timer: {
    width: SCREEN_WIDTH * 0.8,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 50
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  remainTime: {
    fontSize: 25
  },
  editBtn: {
    margin: 5
  },
  handles: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  }
});

export default Timer;
