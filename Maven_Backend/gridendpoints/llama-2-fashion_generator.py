%pip install --upgrade pip
%pip install tensorflow-gpu

import tensorflow as tf
tf.config.list_physical_devices('GPU')

%pip install autotrain-advanced
%pip install huggingface_hub

%autotrain setup --update-torch    

from huggingface_hub import login
login()

%autotrain llm --train --project_name 'llama-2-fashion_generator' --model meta-llama/Llama-2-7b-hf --data_path Nikhil7280/partial_final_data --text_column prompts --text_column productDisplayName --use_peft --use_int4 --learning_rate 2e-4 --train_batch_size 2 --num_train_epochs 3 --trainer sft --model_max_length 2048 --push_to_hub --repo_id sAmBiT77/llama-2-fashion_generator --block_size 2048 > training.log 