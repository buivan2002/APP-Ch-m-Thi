import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface AnswerItem {
  id: number;
  selectedAnswer: string | null;
}

const AnswerScreen = () => {
    const route: RouteProp<RootStackParamList, 'review-detail'> = useRoute();


  const [answers, setAnswers] = useState<AnswerItem[]>(
    
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      selectedAnswer: null,
    }))
  );

  const handleAnswerChange = (id: number, selectedAnswer: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[id - 1].selectedAnswer = selectedAnswer;
      return updatedAnswers;
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.questionItem}>
            <Text style={styles.questionText}>Câu {item.id}</Text>
            <View style={styles.optionsContainer}>
              {['A', 'B', 'C', 'D'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    item.selectedAnswer === option ? styles.selectedOption : null,
                  ]}
                  onPress={() => handleAnswerChange(item.id, option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  questionItem: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 20,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
});

export default AnswerScreen;
