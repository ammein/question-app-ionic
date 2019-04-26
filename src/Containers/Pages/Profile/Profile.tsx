import React , { Component } from 'react';
import Content from '../../../HOC/Content/Content';

interface Props {}

interface State {}

class Profile extends Component<Props , State>{
    constructor(props : Props){
        super(props)
    }
    render(){
        return (
            <Content enableContent={true} enableToolbar={true}>
                
            </Content>
        )
    }
}
export default Profile;