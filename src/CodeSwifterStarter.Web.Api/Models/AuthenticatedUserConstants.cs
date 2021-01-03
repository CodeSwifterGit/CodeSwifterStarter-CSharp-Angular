namespace CodeSwifterStarter.Web.Api.Models
{
    public static class AuthenticatedUserConstants
    {
        public const string ClaimTypeUserId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        public const string ClaimTypeName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
        public const string ClaimTypeEmail = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
        public const string ClaimTypeEmailVerified = "https://codeswifterstarter.com/identity/claims/email_verified";
        public const string ClaimTypeNickName = "https://codeswifterstarter.com/identity/claims/nickname";
        public const string ClaimTypePicture = "https://codeswifterstarter.com/identity/claims/picture";
        public const string ClaimTypeUpdatedAt = "https://codeswifterstarter.com/identity/claims/updated_at";
        public const string ClaimTypeCreatedAt = "https://codeswifterstarter.com/identity/claims/created_at";
        public const string ClaimTypePermissions = "https://codeswifterstarter.com/identity/claims/permissions";
        public const string SessionHeaderIdentifier = "CODE-SWIFTER-SESSION-ID";
    }
}
