import React, { useEffect } from "react";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

import { Container, Content } from "native-base";

import { Row, Grid } from "react-native-easy-grid";

import { toJS } from "../../utils/immutableToJs.jsx";

import Logo from '../../components/logo'
import TokenCheck from './components/TokenCheck.jsx'
import { getCurrentUserScript as getAppuserScript } from '../../modules/appuser/selector'

const TokenScreen = ({
  navigation,
  userScript
}) => {

  const acceptedState = ['started', 'paused','playing']
  const playingScript = userScript && acceptedState.includes(userScript.state)

  useEffect(() => {
    if (playingScript) {
      navigation.navigate('App')
    }
  }, [userScript])

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Content contentContainerStyle={styles.contentStyles}>
          <Grid style={styles.grid}>
            <Row size={1} />
            <Row size={6}>
              <Logo />
            </Row>
            <TokenCheck />
          </Grid>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  contentStyles: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: "100%",
  },
  paddingRow: {
    paddingHorizontal: 10,
  },
  grid: {
    alignItems: "center",
  },
  textRow: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "#D96235",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  userScript: getAppuserScript(state)
})

export default connect(mapStateToProps, null)(toJS(TokenScreen));
