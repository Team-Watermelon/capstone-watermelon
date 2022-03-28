import React from 'react'
import Card from "react-native-card-component";
import { SafeAreaView, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const UserCard = () => {
    return (
<SafeAreaView >
    <Card>
        <Card.Thumbnail
        source={{ uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
        style={{ height: 85, width: 97 }}
        align={'left'}
        // stretch
        // imageProps={{resizeMode: 'contain'}}
        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    />
    <Card.Content>
        <Card.Title
        text={'Ex Lorem magna sint labore ex commodo dolor minim ad.'}
        />
        <Card.Row>
        <Card.Col>
            <Button mode={'outlined'}>Listen to Mary's Story</Button>
        </Card.Col>
        <Card.Col>
            <Button mode={'contained'}>Connect with Mary</Button>
        </Card.Col>
        </Card.Row>
    </Card.Content>
</Card>
<Card>
    <Card.Thumbnail
        source={{ uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
        style={{ height: 85, width: 97 }}
        align={'left'}
        // stretch
        // imageProps={{resizeMode: 'contain'}}
        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    />
    <Card.Content>
        <Card.Title
        text={'Ex Lorem magna sint labore ex commodo dolor minim ad.'}
        />
        <Card.Row>
        <Card.Col>
            <Button mode={'outlined'}>Listen to Mary's Story</Button>
        </Card.Col>
        <Card.Col>
            <Button mode={'contained'}>Connect with Mary</Button>
        </Card.Col>
        </Card.Row>
    </Card.Content>
</Card>
<Card>
    <Card.Thumbnail
        source={{ uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
        style={{ height: 85, width: 97 }}
        align={'left'}
        // stretch
        // imageProps={{resizeMode: 'contain'}}
        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    />
    <Card.Content>
        <Card.Title
        text={'Ex Lorem magna sint labore ex commodo dolor minim ad.'}
        />
        <Card.Row>
        <Card.Col>
            <Button mode={'outlined'}>Listen to Mary's Story</Button>
        </Card.Col>
        <Card.Col>
            <Button mode={'contained'}>Connect with Mary</Button>
        </Card.Col>
        </Card.Row>
    </Card.Content>
</Card>
</SafeAreaView>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    },
    box: {
      width: 60,
      height: 60,
      marginVertical: 20,
    },
  });