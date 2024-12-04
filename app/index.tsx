import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { DarkTheme, Provider as PaperProvider, Card, Title, Paragraph, Searchbar } from 'react-native-paper';

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    // Fetch data from News API
    axios
      .get('https://newsapi.org/v2/everything?q=apple&from=2024-12-03&to=2024-12-03&sortBy=popularity&apiKey=c89332fadf2348b280255dc453ea8a4d')
      .then((response) => {
        // Filter out articles with missing or invalid data
        const validArticles = response.data.articles.filter(
          (article) =>
            article.title &&
            article.description &&
            article.urlToImage && // Ensure there's an image to display
            article.url
        );
        setArticles(validArticles);
        setFilteredArticles(validArticles); // Set filtered articles initially as all valid articles
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const onSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles); // Show all articles if search query is empty
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.card} onPress={() => Linking.openURL(item.url)}>
        <Card.Cover source={{ uri: item.urlToImage }} />
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  return (
    <PaperProvider theme={DarkTheme}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Berita Paundra</Text>

        {/* Search Bar */}
        <Searchbar
          placeholder="Cari berita..."
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Loading or Displaying Articles */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={filteredArticles}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            contentContainerStyle={styles.flatList}
          />
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
    borderRadius: 8,
  },
  flatList: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
  },
});

export default NewsApp;
