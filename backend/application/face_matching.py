from scipy.spatial.distance import cosine
from typing import Optional
from application import models
import numpy as np
from base64 import b64encode


def match_face(missing_persons, embedding, threshold=0.2): # Added threshold
        # Compare with stored embeddings using cosine similarity
        best_match: Optional[models.MissingPerson] = None
        best_similarity = float("inf")  # Lower is better for cosine distance

        for person in missing_persons:
            stored_embedding = np.array(person.embedding)

            # Compute cosine similarity (1 - cosine distance)
            similarity = cosine(embedding, stored_embedding)
            if similarity < best_similarity:
                best_similarity = similarity
                best_match = person

        # Check if the best match meets the threshold
        if best_match and best_similarity < threshold:
            return {
                "id": best_match.id,
                "name": best_match.name,
                "age": best_match.age,
                "last_seen_location": best_match.last_seen_location,
                "issuer_name": best_match.issuer_name,
                "issuer_mobile_number": best_match.issuer_mobile_number,
                "issuer_email_address": best_match.issuer_email_address,  
                "similarity_score": 1 - best_similarity,  # Convert distance to similarity
                "image": b64encode(best_match.image).decode('utf-8')
            }
        else:
            return None