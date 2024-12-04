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
        placeholderTextColor="#dcdcdc" // Light placeholder text
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
    backgroundColor: '#121212', // Dark background for the app
    paddingTop: 30, // Keep the paddingTop as per the previous style
    paddingHorizontal: 20, // Padding on the sides
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background for loader
  },
  header: {
    fontSize: 36, // Slightly bigger font for header
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff', // White text color for the header
    fontFamily: 'Roboto', // Modern and clean font
  },
  searchBar: {
    marginBottom: 20, // To add space below the search bar
    borderRadius: 8,  // Rounded corners for the search bar
    backgroundColor: '#333333', // Dark background for search bar
    paddingHorizontal: 15, // Padding inside the search bar
    paddingVertical: 11,
    color: '#ffffff', // White text color
    height: 50, // Adjusted height for better appearance
  },
  // For placeholder text appearance (optional)
  searchBarPlaceholder: {
    color: '#dcdcdc', // Lighter color for the placeholder text
    fontSize: 14, // Smaller font size for the placeholder
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e', // Darker gray for card background
    borderRadius: 15, // Rounded corners for the card
    overflow: 'hidden',
    elevation: 5, // Shadow effect for the card
    borderWidth: 1, // Subtle border around the card
    borderColor: '#444', // Slightly darker border for cards
  },
  image: {
    width: '100%', // Full width of the card for the image
    height: 220, // Fixed height for the image
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15, // Rounded corners for image
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff', // White text color for title
    fontFamily: 'Roboto', // Elegant and modern font
  },
  description: {
    fontSize: 14,
    color: '#dcdcdc', // Lighter gray color for description
    lineHeight: 20,
  },
});




export default App;
