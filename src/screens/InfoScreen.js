import React from 'react';
import { Image } from 'react-native';
import { Container, Content} from 'native-base';

class InfoScreen extends React.Component {

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.viewStyles}>
        </Content>
      </Container>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  }
}

export default (InfoScreen);
