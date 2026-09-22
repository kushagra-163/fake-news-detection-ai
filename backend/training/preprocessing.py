import re
import pandas as pd

def clean_text(text: str) -> str:
    """
    NLP text cleaning pipeline:
    1. Handle empty/non-string values
    2. Lowercase conversion
    3. Remove URLs and HTML tags
    4. Remove non-alphabetical noise (retain spaces)
    5. Whitespace normalization
    """
    if not isinstance(text, str):
        return ""
    
    # Lowercase
    text = text.lower()
    
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    
    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)
    
    # Remove special characters, numbers, and extra punctuation (keep english letters)
    text = re.sub(r'[^a-z\s]', ' ', text)
    
    # Collapse multiple whitespaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def preprocess_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Preprocesses the news dataframe:
    - Drops duplicates and null values
    - Combines title and text for richer feature representation
    - Cleans combined text
    - Normalizes labels to standard uppercase ('FAKE', 'REAL')
    """
    df = df.copy()
    
    # Detect title and text columns
    title_col = 'title' if 'title' in df.columns else None
    text_col = 'text' if 'text' in df.columns else None
    label_col = 'label' if 'label' in df.columns else ('class' if 'class' in df.columns else 'target')

    if not text_col and not title_col:
        raise ValueError("Dataset does not contain text or title columns.")
    
    # Fill NA values
    if title_col:
        df[title_col] = df[title_col].fillna("")
    if text_col:
        df[text_col] = df[text_col].fillna("")
        
    # Combine title and text if both exist
    if title_col and text_col:
        df['combined_text'] = df[title_col] + " " + df[text_col]
    elif text_col:
        df['combined_text'] = df[text_col]
    else:
        df['combined_text'] = df[title_col]

    # Clean combined text
    df['cleaned_text'] = df['combined_text'].apply(clean_text)
    
    # Remove rows with empty cleaned text
    df = df[df['cleaned_text'].str.strip() != ""].copy()
    
    # Standardize labels
    df['label'] = df[label_col].astype(str).str.upper().str.strip()
    
    # Map any numeric 0/1 or variant strings if present
    label_map = {'0': 'FAKE', '1': 'REAL', 'FALSE': 'FAKE', 'TRUE': 'REAL'}
    df['label'] = df['label'].map(lambda x: label_map.get(x, x))
    
    # Retain only FAKE and REAL
    df = df[df['label'].isin(['FAKE', 'REAL'])].copy()
    
    # Drop duplicate cleaned texts
    df = df.drop_duplicates(subset=['cleaned_text']).reset_index(drop=True)
    
    return df
