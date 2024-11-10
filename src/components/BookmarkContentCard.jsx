import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import Ribbon from '../assets/icons/ribbon.svg';
import Delete from '../assets/icons/delete.svg';
import {COLORS} from '../constants/COLORS';

const BookmarkContentCard = ({
  onPress,
  title,
  onDeleted,
  image,
  description,
}) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDeleted}>
      <Delete width={30} height={30} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Ribbon width={30} height={30} />
        {image && <Image source={image} />}
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default BookmarkContentCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 0.5,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: COLORS.BLACK,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  description: {
    color: COLORS.GRAY,
    marginLeft: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
});
