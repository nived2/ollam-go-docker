import React, { useEffect, useState } from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (model: string) => void;
}

interface Model {
  name: string;
  size: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelect }) => {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:11434/api/tags');
        const data = await response.json();
        setModels(data.models || []);
      } catch (error) {
        console.error('Failed to fetch models:', error);
        // Set default models if fetch fails
        setModels([
          { name: 'llama2', size: '7B' },
          { name: 'codellama', size: '7B' },
          { name: 'mistral', size: '7B' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Model
      </label>
      <select
        value={selectedModel}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        disabled={isLoading}
      >
        {isLoading ? (
          <option>Loading models...</option>
        ) : models.length === 0 ? (
          <option>No models available</option>
        ) : (
          models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name} ({model.size})
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default ModelSelector;
