import React, {useEffect} from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "../services/actions";
import {RootState} from "../services/rootReducer";


const ListComp: React.FC = () => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector((state: RootState) => state.data);


  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataRequest());
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime");
        const data = await response.json();
        console.log("API Response:", data);
        dispatch(fetchDataSuccess(data.data));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchDataFailure(error.message));
        } else {
          dispatch(fetchDataFailure("An unknown error occurred"));
        }
      }
    };


    fetchData();
  }, [dispatch]);


  useEffect(() => {
    console.log("Redux State Data:", data);
  }, [data]);


  const renderItem = ({
    item,
  }: {
    item: {mal_id: number; images: {jpg: {image_url: string}}; title: string};
  }) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.images.jpg.image_url}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fetched Anime List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.mal_id.toString()}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default ListComp;