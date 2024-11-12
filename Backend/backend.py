from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('text_classification_pipeline.pkl', 'rb') as pipeline_file:
    pipeline = pickle.load(pipeline_file)
    print("\nPipeline loaded successfully:", pipeline)

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json.get('text', '')

    if not input_data:
        return jsonify({'error': 'No text provided'}), 400
    
    print("\nReceived input data:", input_data)
    
    prediction = pipeline.predict([input_data])
    prediction_value = prediction[0]
    
    print("Prediction:", prediction_value)
    return jsonify({'prediction': prediction_value})

if __name__ == '__main__':
    app.run(debug=True)
