# Appwrite Database Schema for Lost and Found

## Database Configuration

### Database Name: `lostandfound`
### Collection Name: `lost_items`

## Collection Schema

### Collection ID: `lost_items`
### Collection Name: `Lost Items`

### Attributes:

| Attribute Name | Attribute ID | Type | Size | Required | Default | Array |
|----------------|--------------|------|------|----------|---------|-------|
| item_name | item_name | string | 255 | true | - | false |
| description | description | string | 1000 | true | - | false |
| location | location | string | 255 | false | - | false |
| lost_date | lost_date | datetime | - | true | - | false |
| contact_name | contact_name | string | 255 | true | - | false |
| contact_email | contact_email | string | 255 | true | - | false |
| contact_phone | contact_phone | string | 20 | false | - | false |
| reward | reward | string | 255 | false | - | false |
| status | status | string | 20 | true | "lost" | false |
| user_id | user_id | string | 255 | true | - | false |
| image_url | image_url | string | 500 | false | - | false |
| category | category | string | 50 | false | "other" | false |

### Indexes:

1. **Search Index**
   - Key: `search`
   - Type: `fulltext`
   - Attributes: `["item_name", "description", "location"]`

2. **Status Index**
   - Key: `status`
   - Type: `key`
   - Attributes: `["status"]`

3. **User Index**
   - Key: `user_id`
   - Type: `key`
   - Attributes: `["user_id"]`

4. **Date Index**
   - Key: `lost_date`
   - Type: `key`
   - Attributes: `["lost_date"]`

## Setup Instructions

### 1. Create Database
1. Go to your Appwrite console
2. Navigate to "Databases" section
3. Click "Create Database"
4. Name: `lostandfound`
5. Database ID: `lostandfound`

### 2. Create Collection
1. Inside the `lostandfound` database
2. Click "Create Collection"
3. Collection Name: `Lost Items`
4. Collection ID: `lost_items`
5. Permissions: 
   - Create: `users` (authenticated users can create)
   - Read: `any` (anyone can read)
   - Update: `users` (authenticated users can update)
   - Delete: `users` (authenticated users can delete)

### 3. Create Attributes
Add each attribute from the table above with the specified configuration.

### 4. Create Indexes
Add each index from the indexes section above.

## Data Types Explained

- **item_name**: Name/title of the lost item
- **description**: Detailed description of the item
- **location**: Where the item was lost (optional)
- **lost_date**: When the item was lost
- **contact_name**: Name of the person who lost the item
- **contact_email**: Email for contact
- **contact_phone**: Phone number for contact (optional)
- **reward**: Reward offered for return (optional)
- **status**: Current status ("lost", "found", "returned")
- **user_id**: ID of the user who created the entry
- **image_url**: URL of item image (optional)
- **category**: Item category ("electronics", "clothing", "documents", "other")

## Sample Data

```json
{
  "item_name": "iPhone 13 Pro",
  "description": "Black iPhone 13 Pro with cracked screen, last seen in library",
  "location": "University Library, 2nd floor",
  "lost_date": "2024-01-15T14:30:00.000Z",
  "contact_name": "John Doe",
  "contact_email": "john.doe@email.com",
  "contact_phone": "+1234567890",
  "reward": "$50",
  "status": "lost",
  "user_id": "user123",
  "image_url": "https://example.com/iphone.jpg",
  "category": "electronics"
}
```
