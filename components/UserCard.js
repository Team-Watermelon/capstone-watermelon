import React from 'react'
import Card from "react-native-card-component";
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

const UserCard = () => {
    return (
        <SafeAreaView>
<Card>
    <Card.Thumbnail
        source={{ uri: 'https://picsum.photos/200' }}
        style={{ height: 200, width: 300 }}
        align={'center'}
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
            <Button mode={'outlined'}>demo</Button>
        </Card.Col>
        <Card.Col>
            <Button mode={'contained'}>demo</Button>
        </Card.Col>
        </Card.Row>
    </Card.Content>
</Card>
</SafeAreaView>
    )
}

export default UserCard;