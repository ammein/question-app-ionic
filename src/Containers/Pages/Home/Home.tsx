import React , { Component } from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Content from '../../../HOC/Content/Content';
import { IonImg } from '@ionic/react';
import IMAGE from '../../../Assets/SVG/logo.svg';
import MySlider from '../../../Components/UI/Slider/Slider';
import { Slider } from '../../../Utils/Declaration/Utils';
import testImage from '../../../Assets/Images/Ubuntu.PNG';

interface Props {}

interface State {
    slider : Slider[]
}

class Home extends Component<Props , State>{
    constructor(props : Props){
        super(props);
        this.state = {
            slider : [
                {
                    img : IMAGE
                },
                {
                    img: testImage
                }
            ]
        }
    }

    render(){
        return (
            <Aux>
                <Content {...this.props} 
                enableContent={true}
                enableToolbar={true}>
                    <MySlider data={this.state.slider} style={{
                        height : "200px"
                    }}/>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum eligendi, distinctio aperiam, iure nisi cum maiores, facere esse temporibus ea asperiores. Iste, dicta. Suscipit consectetur culpa fugit quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, dicta quaerat. Repudiandae, fugit suscipit illum non praesentium ipsum distinctio voluptate, consequuntur porro assumenda eius neque quisquam doloremque laborum in nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere voluptatum reprehenderit nam dicta quod in, blanditiis culpa? Veritatis illo ut aut vitae odio sit voluptates maxime dolor nam rem! lore
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam incidunt minima asperiores unde quos iusto iure porro architecto cupiditate, ullam earum, deserunt non quisquam libero possimus in nihil dolor!
                    </p>
                </Content>
            </Aux>
        )
    }
}
export default Home;