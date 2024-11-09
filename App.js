import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const NewsApp = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://672bee971600dda5a9f6c950.mockapi.io/magazine')
      .then(({ data }) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статьи');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Vanamo_Logo.svg/768px-Vanamo_Logo.svg.png' }} style={styles.logo} />
        <Text style={{marginLeft: -80}}>Панорама</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.newsContainer}>
        <View style={styles.columns}>
          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.amag }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{new Date(item.date * 1000).toLocaleDateString()}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Новости</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Подписки</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Личный кабинет</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginBottom:60,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    width: '60%',
    fontSize: 16,
    alignContent: "center",
  },
  newsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '48%',  
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position:"fixed",
    bottom:0,
    right:0,
    left:0,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NewsApp;
