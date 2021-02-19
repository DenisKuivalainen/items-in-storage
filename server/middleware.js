const extendTimeout = (req, res, next) => {
    const dummy = ' ';
    let resEnded = false;
    let dataSent = false;
  
    res.once('finish', () => {
        resEnded = true;
    });
  
    res.once('end', () => {
        resEnded = true;
    });
  
    res.once('close', () => {
        resEnded = true;
    });
  
    res.on('data', (data) => {
        if (data !== dummy) {
            dataSent = true;
        }
    });

    const waitMore = () => {
        !res.headersSent && res.writeHead(200);
        res.write(dummy);
        waitWhileNotSent();
    }
    
  
    const waitWhileNotSent = () => setTimeout(() => {
        !resEnded && !dataSent && waitMore();
    }, 5000);

    waitWhileNotSent();
    next();
};

module.exports = {
    extendTimeout
};