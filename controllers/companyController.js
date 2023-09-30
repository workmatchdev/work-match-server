const Companies = require('../models/Companies');

// Controlador para crear una nueva empresa
const createCompany = async (req, res) => {
    try {
      const newCompany = new Companies(req.body);
      const savedCompany = await newCompany.save();
      res.status(201).json(savedCompany);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Controlador para obtener todas las empresas
  const getAllCompanies = async (req, res) => {
    try {
      const companies = await Companies.find();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controlador para obtener una empresa por su ID
  const getCompanyById = async (req, res) => {
    try {
      const company = await Companies.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controlador para actualizar una empresa por su ID
  const updateCompanyById = async (req, res) => {
    try {
      const updatedCompany = await Companies.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCompany) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }
      res.status(200).json(updatedCompany);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controlador para eliminar una empresa por su ID
  const deleteCompanyById = async (req, res) => {
    try {
      const deletedCompany = await Companies.findByIdAndDelete(req.params.id);
      if (!deletedCompany) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById,
  };