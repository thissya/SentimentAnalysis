import React, { useState } from 'react';

const SentimentForm = () => {
    const [text, setText] = useState('');
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://sentimentanalysis-api.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            setSentiment(data.prediction);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold caret-transparent text-gray-900 mb-6 text-center">Sentiment Analysis</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text here..."
                    />
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg text-white caret-transparent font-semibold ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} transition duration-300`}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
                    </button>
                </form>
                {sentiment && (
                    <div className="mt-6 text-2xl font-bold caret-transparent text-center text-gray-900">
                        Sentiment: <span className={`font-bold ${sentiment === 'positive' ? 'text-green-500' : sentiment === 'neutral' ? 'text-yellow-500' : 'text-red-500'}`}>{sentiment}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SentimentForm;
