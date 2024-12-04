import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const url = 'https://newsapi.org/v2/everything?q=apple&from=2024-12-03&to=2024-12-03&sortBy=popularity&apiKey=c89332fadf2348b280255dc453ea8a4d';

  useEffect(() => {
    // Fetch data from API
    axios.get(url)
      .then(response => {
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching the news: ", error);
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = articles.filter(article =>
        article.title.toLowerCase().includes(text.toLowerCase()) || 
        article.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredArticles(filteredData);
    } else {
      setFilteredArticles(articles);
    }
  };

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => { /* Handle navigation to detail */ }}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.header}>Berita Paundra</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari Berita..."
        placeholderTextColor="#dcdcdc"  
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* FlatList to display articles */}
      <FlatList
        data={filteredArticles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  
    paddingTop: 30,  
    paddingHorizontal: 20,  
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', /
  },
  header: {
    fontSize: 36, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',  
    fontFamily: 'Roboto',  
  },
  searchBar: {
    marginBottom: 20, 
    borderRadius: 8,  
    backgroundColor: '#333333',  
    paddingHorizontal: 15,  
    paddingVertical: 11,
    color: '#ffffff',  
    height: 50,  
  },
 
  searchBarPlaceholder: {
    color: '#dcdcdc',  
    fontSize: 14,  
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 15, 
    overflow: 'hidden',
    elevation: 5, 
    borderWidth: 1, 
    borderColor: '#444', 
  },
  image: {
    width: '100%', 
    height: 220, 
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15, 
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff', 
    fontFamily: 'Roboto', 
  },
  description: {
    fontSize: 14,
    color: '#dcdcdc', 
    lineHeight: 20,
  },
});




export default App;
