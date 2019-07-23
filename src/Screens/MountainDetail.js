import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput, SafeAreaView, Image, ScrollView, AsyncStorage } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Footer, FooterTab } from 'native-base';
import axios from 'axios'
import NumberFormat from 'react-number-format';

const { height, width } = Dimensions.get('window')

export default class MountainDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            MountainPhotos: [
                'https://i.pinimg.com/564x/e5/6a/e1/e56ae1f08cd16acb2c47b53f5edc299f.jpg',
                'https://i.pinimg.com/564x/5e/3c/6b/5e3c6b968ac1ba5463f96fc370270b8a.jpg',
                'https://i.pinimg.com/564x/b6/3f/59/b63f590d457d01e7659b509e85acede9.jpg'
            ],
            mountainData: [],
            shops: [
                {
                    name: 'Toko 1',
                    address: 'Jl Terus',
                    products: [
                        {
                            photo: 'https://i.pinimg.com/564x/70/a2/fb/70a2fbe04a907ab3c526748e7be6238a.jpg',
                            product_name: 'Tas Camping'
                        },
                        {
                            photo: 'https://i.pinimg.com/564x/1d/7f/9d/1d7f9d196324d1c15d5a59a09f548326.jpg',
                            product_name: 'Sepatu Camping'
                        },
                        {
                            photo: 'https://i.pinimg.com/564x/f6/b0/1e/f6b01ec026a4c1bb3d63a035dd325750.jpg',
                            product_name: 'Tenda Camping'
                        }
                    ]
                },
                {
                    name: 'Toko 2',
                    address: 'Jl Jalan',
                    products: [
                        {
                            photo: 'https://i.pinimg.com/564x/70/a2/fb/70a2fbe04a907ab3c526748e7be6238a.jpg',
                            product_name: 'Tas Camping'
                        },
                        {
                            photo: 'https://i.pinimg.com/564x/1d/7f/9d/1d7f9d196324d1c15d5a59a09f548326.jpg',
                            product_name: 'Sepatu Camping'
                        },
                        {
                            photo: 'https://i.pinimg.com/564x/f6/b0/1e/f6b01ec026a4c1bb3d63a035dd325750.jpg',
                            product_name: 'Tenda Camping'
                        }
                    ]
                },
                {
                    name: 'Toko 3',
                    address: 'Jl Dulu',
                    products: [
                        {
                            photo: 'https://i.pinimg.com/564x/70/a2/fb/70a2fbe04a907ab3c526748e7be6238a.jpg',
                            product_name: 'Tas Camping'
                        },
                        {
                            photo: 'https://i.pinimg.com/564x/1d/7f/9d/1d7f9d196324d1c15d5a59a09f548326.jpg',
                            product_name: 'Sepatu Camping'
                        },
                        {
                            photo: 'https://i.pinimg.com/564x/f6/b0/1e/f6b01ec026a4c1bb3d63a035dd325750.jpg',
                            product_name: 'Tenda Camping'
                        }
                    ]
                },
            ],
            userId: 'user',
            partnerId: 'user',
            partnerName: 'Gunung'
        }
    }
    // static navigationOptions = ({navigation}) => ({
    //   headerTitle: 'Nama Gunung',
    //   headerTitleStyle: { 
    //       width: '100%',
    //       textAlign: 'left',

    //   },
    // })

    _renderItem({ item, index }) {
        return (
            <Image style={{ flex: 1, resizeMode: 'contain', }} source={{ uri: item }} />
        )
    }

    prevCarouselImage = () => {
        this.state.activeIndex > 0 ?
            this.carousel._snapToItem(this.state.activeIndex - 1) : this.carousel._snapToItem(this.state.MountainPhotos.length - 1)
    }

    nextCarouselImage = () => {
        this.state.activeIndex < this.state.MountainPhotos.length - 1 ?
            this.carousel._snapToItem(this.state.activeIndex + 1) : this.carousel._snapToItem(0)
    }

    componentDidMount() {
        // let mountId = navigation.getParam("mountainId")
        axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
        const AuthStr = 'x-app-name '.concat("menung982998372771"); 
        axios.get(`https://menung.herokuapp.com/mountains/5d3642762084e22404f9f2d2`, { headers: { 
            Authorization: AuthStr
            }})
            .then((response) => { //use arrow to get setState on this call without any extra binding or placeholder variable
                console.warn(response.data.data);
                this.setState({
                    mountainData: response.data.data,
                })
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    // fetchMountain = async () => {
    //     await axios.get(`https://menung.herokuapp.com/mountains/5d3642762084e22404f9f2d2`)
    //         .then(function (response) {
    //         //    this.setState({mountainData: response.data.data})
    //         console.warn('data',response.data.data);
    //         return response.data.data
    //         })
    //         .catch(function (error) {
    //             console.warn('error',error);
    //         });
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: 'white', backgroundColor: '#34c759' }}>
                    {this.state.mountainData.name}
                </Text>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={{ height: 250, backgroundColor: 'white', flex: 5 }}>
                        <Carousel
                            ref={ref => this.carousel = ref}
                            data={this.state.mountainData.images}
                            sliderWidth={width}
                            itemWidth={width}
                            renderItem={this._renderItem}
                            onSnapToItem={
                                index => this.setState({ activeIndex: index })
                            }
                        />
                        <View style={{ flexDirection: 'row', alignSelf: 'center', top: 3, bottom: 20, left: 10 }}>
                            {this.state.MountainPhotos.map((item, i) =>
                                <View key={i} style={{ width: 8, height: 8, borderRadius: 25, backgroundColor: this.state.activeIndex == i ? '#34c759' : '#e8eaed', margin: 3 }} />
                            )}
                        </View>

                    </View>
                    <View style={{ backgroundColor: 'white', width: '100%', flex: 1, padding: 20, justifyContent: 'space-evenly' }}>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#34c759', fontWeight: 'bold' }}>Detail</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity 
                                onPress={()=> this.props.navigation.navigate('Chat',
                                {
                                    name : this.state.partnerName,
                                    userId : this.state.partnerId,
                                })}>
                                    <FontAwesome style={{ fontSize: 20, color: '#34c759' }} name="wechat" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: '5%' }}>
                                    <FontAwesome style={{ fontSize: 20, color: '#34c759' }} name="map-o" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, padding: 20, backgroundColor: 'white', marginBottom: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Ketinggian Puncak</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.summit} m</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Sisa Kuota Pendaki</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.quota} orang</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Harga per-Pendaki</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <NumberFormat
                                        value={this.state.mountainData.price}
                                        displayType={'text'}
                                        thousandSeparator={true} prefix={'Rp '}
                                        renderText={value => <Text>: {value}</Text>}
                                    />
                                    {/* <Text>: {this.state.mountainData.price} orang</Text> */}
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Jenis Gunung</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.mountainType}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Letak Gunung</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.address}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>Rute Termudah</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>: {this.state.mountainData.easiestRoute}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button
                                    onPress={() => this.props.navigation.navigate('BookingMountain', {
                                        userId: this.state.userId,
                                        mountainId: this.state.mountainData._id,
                                        mountainPrice: this.state.mountainData.price
                                    })}
                                    style={{ backgroundColor: '#34c759', justifyContent: 'center', width: 100, borderRadius: 10 }} >
                                    <Text style={{ fontSize: 16, color: 'white' }}>Booking</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#34c759',
                            borderBottomWidth: 2,
                        }}
                    />

                    <View style={{ backgroundColor: 'white', width: '100%', flex: 1, padding: 20, alignContent: 'space-around' }}>
                        <Text style={{ fontSize: 16, color: '#34c759', fontWeight: 'bold' }}>Saran Toko</Text>
                        {this.state.shops.map((item, i) =>
                            item.name.length > 0 &&
                            (
                                <View key={i} style={{ flex: 1, marginTop: 10, borderColor: '#34c759', borderWidth: 2, backgroundColor: 'white', width: '100%', height: '100%' }}>
                                    <TouchableOpacity
                                        // onPress={() => this.props.navigation.navigate('ProductCategory', { categoryId: item._id })} 
                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                        <View style={{ flex: 1 }}><Text style={{ fontSize: 20 }}>{item.name}</Text></View>
                                        <View style={{ right: 0 }}><Text style={{ color: 'grey' }}>{item.address}</Text></View>
                                    </TouchableOpacity>
                                    <ScrollView style={{ padding: 10, marginBottom: 20 }} horizontal={true}>
                                        {item.products.map((item, i) =>
                                            <TouchableOpacity key={i} style={{ flex: 1, width: 150, height: 150, backgroundColor: 'white', borderColor: '#34c759', borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}
                                            // onPress={() => this.props.navigation.navigate('DetailProduct', { productId: item._id })}
                                            >
                                                <Image style={{ width: 100, height: 100 }} source={{ uri: item.photo }} />
                                                <View style={{ width: '100%' }}>
                                                    <Text style={{ color: 'grey' }} numberOfLines={2}>{item.product_name}</Text>
                                                    {/* <Text style={{ color: '#dce1e6', fontSize: 15, marginTop: 15 }}>Rp {Math.ceil(item.product_price * 100 / (100 - 30))}</Text>
                                                    <Text style={{ fontSize: 15, marginTop: 5 }}>Rp {item.product_price}</Text>
                                                    <View style={{ backgroundColor: 'orange', padding: 3, width: '40%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: 'white' }}>30%</Text>
                                                    </View> */}
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                </View>
                            )
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}