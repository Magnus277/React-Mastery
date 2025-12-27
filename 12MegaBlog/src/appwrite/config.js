import conf from "../conf/conf.js";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // CREATE POST
  async createPost({ title, slug, content, featuredImage, userId }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug, // slug as document ID
        data: {
          title,
          slug,
          content,
          featuredImage,
          userId,
        },
      });
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  // UPDATE POST
  async updatePost(slug, { title, content, featuredImage }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
        },
      });
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  // DELETE POST
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // GET SINGLE POST
  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return null;
    }
  }

  // GET ALL POSTS
  async getPosts() {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        queries: [Query.orderDesc("$createdAt")],
      });
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return [];
    }
  }

  // UPLOAD IMAGE
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return null;
    }
  }

  // DELETE IMAGE
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // GET IMAGE PREVIEW
  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      conf.appwriteBucketId,
      fileId
    );
  }
}

const service = new Service();
export default service;
