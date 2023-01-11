import React, { Component } from 'react'

class DecideActivity extends Component {


    constructor(props) {
        super(props);
        this.state =
        {
            latitude: 0,
            error: ''
        };

        window.navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.setState({
                latitude: position.coords.latitude
            });
        },
            (err) => {
                console.log(err);
                this.setState({
                    error: err.message
                });
            }

        );
    }
    // state = {
    //     latitude: 0
    // };

    componentWillUnmount() {
        this.setState({
            latitude: 0
        });
    }

    decideAvtivity(lat) {
        const currentMounth = new Date().getMonth();
        const summer = {
            text: 'Du kannst zu Schwimmen gehen',
            iconName: 'sun'
        }
        const winter = {
            text: 'Sie können zum Scheefahren gehen',
            iconName: 'snowflake'
        }
        if (lat < 0) {
            //im Süden

            return currentMounth > 5 && currentMounth < 8 ? winter : summer;

        }
        else {
            //im Norden
            return currentMounth > 8 || currentMounth <5 ? winter : summer;
        }
    }


    render() {
        const { latitude, error } = this.state;
        console.log(this.decideAvtivity(latitude))





        if (latitude !== 0 && !error) {
            const activity = this.decideAvtivity(latitude);
            return (
                <h2 className="ui header">
                    <i className={`${activity.iconName} outline icon`}></i>
                    <div className="content">
                        {activity.text}
                    </div>
                </h2>
            )
        }

        else if (latitude === 0 && error) {
            return (
                <div>
                    Fehler : {error}
                </div>
            )
        }

        return (
            <div>
                Loading...
            </div>
        )
    }
}
export default DecideActivity;
