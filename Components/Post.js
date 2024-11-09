import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const PostView = styled.View`
flex-direction: row;
padding: 5px;
background-color: #e6e6e6;
border-radius: 5px;
margin-top: 40px;
`;

const PostImage = styled.Image`
height: 60px;
width: 60px;
border-radius: 12px;
margin-left: 5%;
`;

const PostTitle = styled.Text`
font-size: 17px;
font-weight: 700;
`;


const PostDate = styled.Text`
font-size: 12px;
color: #808080;
`;

const PostDetails = styled.View`
margin: 10px;
`;


export default function Post(props) {
  return (
  <PostView>
      <PostImage source={{uri: props.amag}} />
      <PostDetails>
       <PostTitle>{props.title}</PostTitle>
       <PostDate>{props.date}</PostDate>
      </PostDetails>
  </PostView>
  )
}