import { OPEN_AI_KEY } from "@env";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Configuration, OpenAIApi } from "openai"; // Supondo que você esteja usando a biblioteca openai

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});

const openAI = new OpenAIApi(configuration);

const Main = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = async () => {
    try {
      const response = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: `You: ${input}\nAI`, // Corrigido para "prompt"
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
      });
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  return (
    <View>
      <Text>AI BOT</Text>
      <View>
        <TextInput
          placeholder="Digite sua mensagem"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleInput}>
          <Text>Mandar</Text>
        </TouchableOpacity>
        <View>
            <Text>{output}</Text>
        </View>
      </View>
    </View>
  );
};

export default Main;
