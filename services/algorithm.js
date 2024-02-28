import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const FareCalculator = () => {
  const [numPassengers, setNumPassengers] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [totalFare, setTotalFare] = useState('');
  const [distances, setDistances] = useState([]);
  const [fareShares, setFareShares] = useState([]);

  const calculateFareShares = () => {
    const distancesArray = distances.map(distance => parseFloat(distance));
    const totalPassengerDistance = distancesArray.reduce((acc, distance) => acc + distance, 0);

    const calculatedFareShares = distancesArray.map((distance, index) => {
      const distanceShare = distance / totalPassengerDistance;
      const fareShare = distanceShare * parseFloat(totalFare);
      
      return {
        name: `Passenger ${index + 1}`,
        distance,
        fareShare,
      };
    });

    setFareShares(calculatedFareShares);
  };

  return (
    <View>
      <Text>Enter the number of passengers:</Text>
      <TextInput
        value={numPassengers}
        onChangeText={setNumPassengers}
        keyboardType="numeric"
      />

      <Text>Enter the distance for each passenger:</Text>
      {Array.from({ length: parseInt(numPassengers) }, (_, index) => (
        <View key={index}>
          <Text>{`Distance for Passenger ${index + 1}:`}</Text>
          <TextInput
            value={distances[index]}
            onChangeText={value => {
              const updatedDistances = [...distances];
              updatedDistances[index] = value;
              setDistances(updatedDistances);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}

      <Text>Enter the total distance of the route:</Text>
      <TextInput
        value={totalDistance}
        onChangeText={setTotalDistance}
        keyboardType="numeric"
      />

      <Text>Enter the total fare for the trip:</Text>
      <TextInput
        value={totalFare}
        onChangeText={setTotalFare}
        keyboardType="numeric"
      />

      <Button title="Calculate Fare Shares" onPress={calculateFareShares} />

      <Text>Fare Shares:</Text>
      {fareShares.map(passenger => (
        <Text key={passenger.name}>{`${passenger.name}: ${passenger.fareShare}`}</Text>
      ))}
    </View>
  );
};

export default FareCalculator;
