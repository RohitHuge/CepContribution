import { databases, ID, Query, DATABASE_ID } from '../config/appwrite';

const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

class LostItemsService {
  // Create a new lost item
  async createLostItem(itemData) {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          item_name: itemData.item_name,
          description: itemData.description,
          location: itemData.location || '',
          lost_date: itemData.lost_date,
          contact_name: itemData.contact_name,
          contact_email: itemData.contact_email,
          contact_phone: itemData.contact_phone || '',
          reward: itemData.reward || '',
          status: 'lost',
          user_id: itemData.user_id,
          image_url: itemData.image_url || '',
          category: itemData.category || 'other'
        }
      );
      return { success: true, document };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get all lost items
  async getAllLostItems(limit = 20, offset = 0) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return { success: true, documents: response.documents };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get lost items by status
  async getLostItemsByStatus(status, limit = 20, offset = 0) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('status', status),
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return { success: true, documents: response.documents };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Search lost items
  async searchLostItems(searchTerm, limit = 20, offset = 0) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.search('search', searchTerm),
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return { success: true, documents: response.documents };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get lost items by user
  async getLostItemsByUser(userId, limit = 20, offset = 0) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('user_id', userId),
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return { success: true, documents: response.documents };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get a single lost item by ID
  async getLostItemById(itemId) {
    try {
      const document = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        itemId
      );
      return { success: true, document };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update lost item status
  async updateLostItemStatus(itemId, newStatus) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        itemId,
        {
          status: newStatus
        }
      );
      return { success: true, document };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update lost item
  async updateLostItem(itemId, updateData) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        itemId,
        updateData
      );
      return { success: true, document };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete lost item
  async deleteLostItem(itemId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        itemId
      );
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get items by category
  async getLostItemsByCategory(category, limit = 20, offset = 0) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('category', category),
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return { success: true, documents: response.documents };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new LostItemsService();
