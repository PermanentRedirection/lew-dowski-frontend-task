const axios = require('axios');
const API_BASE_URL = process.env.API_BASE_URL || 'http://209.126.0.154';
const API_TOKEN = process.env.API_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'token': API_TOKEN,
    'Content-Type': 'application/json'
  }
});

exports.getRecords = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const searchId = req.query.searchId;
    const row = req.query.row;
    const eventName = req.query?.event_name;
    
    let request = `/get/test/records?page=${page}`;
    
    // Append search parameters if they exist
    const searchParams = new URLSearchParams();
    if (searchId) searchParams.append('id', searchId);
    if (row) searchParams.append('row', row);
    if (eventName) searchParams.append('event_name', eventName);
    if (searchParams.toString()) {
      request += `&${searchParams.toString()}`;
    }
    const response = await apiClient.get(request);
    
    const results = response.data.results;
    
    // Render your view and pass the search results and parameters
    res.render('index', {
      data: results,
      count: response.data.count,
      page: parseInt(page),
      pagesize: response.data.pagesize,
      searchId: searchId,
      row: row,
      eventName: eventName
    });
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).send('Error fetching records');
  }
};

// Route for getting a single record by ID
exports.getSingleRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await apiClient.get(`/get/test/records?id=${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).send('Error fetching record');
  }
};

// Route for purchasing an item (setting purchased to true)
exports.purchaseItem = async (req, res) => {
  try {
    const { id, updated_by } = req.body; // Extract id and updated_by from the request body
    if (!id || !updated_by) {
      return res.status(400).json({ message: 'Missing id or updated_by in request body' });
    }
    
    // Set up the data to be sent in the POST body to the API
    const purchaseData = {
      id,
      updated_by
    };
    
    // POST request to update the record's purchase status to true
    const response = await apiClient.post(`/test/update/true`, purchaseData);
    
    // Respond with the API's response or a success message
    res.json({ message: 'Item purchased successfully', data: response.data });
  } catch (error) {
    console.error('Error purchasing item:', error.message);
    res.status(500).json({ message: 'Error purchasing item', error: error.message });
  }
};

// Route for reverting a purchase (setting purchased to false)
exports.revertPurchase = async (req, res) => {
  try {
    const { id } = req.body; // Extract id from the request body
    if (!id) {
      return res.status(400).json({ message: 'Missing id in request body' });
    }
    
    // Set up the data to be sent in the POST body to the API
    const revertData = { id };
    
    // POST request to update the record's purchase status to false
    const response = await apiClient.post(`/test/update/false`, revertData);
    
    // Respond with the API's response or a success message
    res.json({ message: 'Purchase reverted successfully', data: response.data });
  } catch (error) {
    console.error('Error reverting purchase:', error.message);
    res.status(500).json({ message: 'Error reverting purchase', error: error.message });
  }
};

