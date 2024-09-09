from flask import Flask ,request,jsonify
import pickle 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


with open('E:\BDA Mini\Backend\logistic_regression_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
    print("\nModel loaded successfully:", model)

with open('E:\BDA Mini\Backend\tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)
    print("\n\nVectorizer loaded successfully:", vectorizer)

print("\n\n")

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json.get('text', '')

    if not input_data:
        return jsonify({'error': 'No text provided'}), 400
    
    print("\nReceived input data:", input_data)
    
    transformed_input = vectorizer.transform([input_data])
    prediction = model.predict(transformed_input)
    prediction_value = prediction[0]
    print(prediction_value)
    print("\n")
    return jsonify({'prediction': prediction_value})

if __name__ == '__main__':
    app.run(debug=True)
