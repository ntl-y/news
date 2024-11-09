import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Share,
  Button,
} from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Posts from "../screens/Posts";
import { LinearGradient } from "expo-linear-gradient";

export default class Home extends React.Component {
  state = {
    popularSelected: true,
    searchQuery: "",  // Состояние для поискового запроса
    posts: [
      { name: "Sleepy ahh Kitten", profile: require("../images/p1.jpg"), photo: require("../images/cat2.jpg") },
      { name: "Empty Head", profile: require("../images/p2.jpg"), photo: require("../images/cat1.jpg") },
      { name: "Princess", profile: require("../images/p3.jpg"), photo: require("../images/cat3.jpg") },
      { name: "Crack Head", profile: require("../images/p4.jpg"), photo: require("../images/cat4.jpg") },
      { name: "I ate my bed", profile: require("../images/p5.jpg"), photo: require("../images/cat5.jpg") },
    ],
  };

  onTabPressed = () => {
    this.setState({ popularSelected: !this.state.popularSelected });
  };

  onSearchChange = (text) => {
    this.setState({ searchQuery: text });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  render() {
    const { searchQuery, posts } = this.state;

    // Фильтрация постов по запросу пользователя
    const filteredPosts = posts.filter((post) =>
      post.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <LinearGradient
        colors={["#C13584", "#FCAF45"]}
        locations={[0, 0.3]}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: "100%",
          }}
        >
          <View
            style={{
              height: 260,
              width: "100%",
              paddingHorizontal: 35,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingTop: 40,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "50%",
                }}
              >
                <Image
                  source={require("../images/logo.png")}
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={this.onShare} activeOpacity={0.5}>
                  <Button
                    size={22}
                    color="#C13584"
                    title="Поделиться"
                    style={{
                      marginRight: -7,
                      marginTop: 7,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 25,
                color: "#FFF",
                paddingVertical: 25,
              }}
            >
              РоссГрам
            </Text>

            <View
              style={{
                flexDirection: "row",
                borderColor: "#FFF",
                borderRadius: 40,
                borderWidth: 0.5,
                paddingVertical: 5,
                alignItems: "center",
                backgroundColor: "#FFF",
              }}
            >
              <TextInput
                placeholder="Найти вдохновение ..."
                style={{
                  paddingHorizontal: 20,
                  fontFamily: "Medium",
                  fontSize: 11,
                  width: "90%",
                }}
                value={searchQuery}
                onChangeText={this.onSearchChange} // Обновляем состояние поискового запроса
              />
              <Icon name="magnifying-glass" size={15} color="#C13584" />
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#FFF",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              height: 1000,
              paddingHorizontal: 35,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={this.onTabPressed}
                style={{
                  borderBottomColor: this.state.popularSelected
                    ? "#C13584"
                    : "#FFF",
                  borderBottomWidth: 4,
                  paddingVertical: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bold",
                    color: this.state.popularSelected ? "#C13584" : "#9ca1a2",
                  }}
                >
                  ПОПУЛЯРНЫЕ ПОСТЫ
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.onTabPressed}
                style={{
                  borderBottomColor: this.state.popularSelected
                    ? "#FFF"
                    : "#C13584",
                  borderBottomWidth: 4,
                  paddingVertical: 6,
                  marginLeft: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bold",
                    color: this.state.popularSelected ? "#9ca1a2" : "#C13584",
                  }}
                >
                  Недавние посты
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={false}
            >
              {/* Отображаем отфильтрованные посты */}
              {filteredPosts.map((post, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Posts
                    onPress={() => this.props.navigation.navigate("Detail")}
                    name={post.name}
                    profile={post.profile}
                    photo={post.photo}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
