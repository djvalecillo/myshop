function notFoundHandler(req, res) {
    return res.status(res.statusCode).json({
        error: true, 
        message: 'Route not found.'
    });
}
  
module.exports = notFoundHandler;