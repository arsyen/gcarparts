const requireRoles = (requiredRoles) => {


    return (req, res, next) => {
        //Check if user loged in and has required role
        if (requiredRoles && requiredRoles.length > 0) {

            //If user is not authenticated or don't have any roles don't check even roles
            if (!(req.identity && req.identity.authenticated && req.identity.roles && req.identity.roles.length>0))
                return res.status(403).send('No enough permissions');

            let roleFound = false;
            for (let i = 0; i < requiredRoles.length; i++) {
                
                if (req.identity.roles.indexOf(requiredRoles[i]) >= 0) {
                    roleFound = true;
                    break;
                }
            }
            if (roleFound)
                next();
            else
                return res.status(403).send('No enough permissions');
        }
        else {
            next();
        }
    }
}

module.exports = requireRoles;