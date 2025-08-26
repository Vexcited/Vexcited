# Sekai Bank - Signature [Reverse] [Mobile] [Easy]

We are given an APK, let's open the file with JADX.

## `ApiClient` & `ApiService` classes

We quickly find the API URL...

```java
private static final String BASE_URL = "https://sekaibank-api.chals.sekai.team/api/";
private static final String TAG = "SekaiBank-API";
```

...and also some interesting API methods...

```java
@POST("flag")
Call<String> getFlag(@Body FlagRequest flagRequest);
```

```java
public class FlagRequest {
  private boolean unmask_flag;

  public FlagRequest(boolean unmask_flag) {
    this.unmask_flag = unmask_flag;
  }
}
```

We can guess we need to call `POST https://sekaibank-api.chals.sekai.team/api/flag` to get our flag!
But when digging a bit deeper, we see a signature header is required...

## `X-Signature` header generation

When reading `ApiClient` class, we can find those methods.

```java
private String generateSignature(Request request) throws IOException, GeneralSecurityException {
    Signature[] signatureArr;
    String str = request.method() + "/api".concat(getEndpointPath(request)) + getRequestBodyAsString(request);
    SekaiApplication sekaiApplication = SekaiApplication.getInstance();
    PackageManager packageManager = sekaiApplication.getPackageManager();
    String packageName = sekaiApplication.getPackageName();
    try {
        if (Build.VERSION.SDK_INT >= 28) {
            PackageInfo packageInfo = packageManager.getPackageInfo(packageName, 134217728);
            SigningInfo signingInfo = packageInfo.signingInfo;
            if (signingInfo != null) {
                if (signingInfo.hasMultipleSigners()) {
                    signatureArr = signingInfo.getApkContentsSigners();
                } else {
                    signatureArr = signingInfo.getSigningCertificateHistory();
                }
            } else {
                signatureArr = packageInfo.signatures;
            }
        } else {
            signatureArr = packageManager.getPackageInfo(packageName, 64).signatures;
        }
        if (signatureArr != null && signatureArr.length > 0) {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            for (Signature signature : signatureArr) {
                messageDigest.update(signature.toByteArray());
            }
            return calculateHMAC(str, messageDigest.digest());
        }
        throw new GeneralSecurityException("No app signature found");
    } catch (PackageManager.NameNotFoundException | NoSuchAlgorithmException e) {
        throw new GeneralSecurityException("Unable to extract app signature", e);
    }
}

private String getEndpointPath(Request request) {
    String url = request.url().getUrl();
    String substring = ApiClient.BASE_URL.substring(0, ApiClient.BASE_URL.length() - 1);
    if (url.startsWith(substring)) {
        return url.substring(substring.length());
    }
    return request.url().encodedPath();
}

private String getRequestBodyAsString(Request request) throws IOException {
    RequestBody body = request.body();
    if (body == null) {
        return "{}";
    }
    if (isMultipartBody(body)) {
        Log.d(ApiClient.TAG, "Multipart request detected, using empty body for signature");
        return "{}";
    }
    Buffer buffer = new Buffer();
    body.writeTo(buffer);
    return buffer.readUtf8();
}

private String calculateHMAC(String str, byte[] bArr) throws GeneralSecurityException {
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec(bArr, "HmacSHA256"));
    byte[] doFinal = mac.doFinal(str.getBytes(StandardCharsets.UTF_8));
    StringBuilder sb = new StringBuilder();
    for (byte b : doFinal) {
        String hexString = Integer.toHexString(b & UByte.MAX_VALUE);
        if (hexString.length() == 1) {
            sb.append('0');
        }
        sb.append(hexString);
    }
    return sb.toString().toLowerCase();
}
```

## Make our own `X-Signature`

With all the above, we can make our own signature but we're missing the app signing key.
In JADX we can easily see the APK signature information and we can find this:

```
Signer 1
Type: X.509
Version: 1
Serial number: 0x1
Subject: C=ID, ST=Bali, L=Indonesia, O=HYPERHUG, OU=Development, CN=Aimar S. Adhitya
Valid from: Sun May 18 14:38:07 CEST 2025
Valid until: Thu May 12 14:38:07 CEST 2050
Public key type: RSA
Exponent: 65537
Modulus size (bits): 2048
Modulus: 19703289895466337954493529067867908734776787010231658215687655422744309993670306098639306028028014282093521461865353822680769473815464842890665381345891634559728761331425362935211389278549151982538899571288376184070641850139758096938025479184817766831094159071593887899019745416952900268187423688286091222975051301889280027463189819489280810499025367056832751363320270527015506217506330067105871429958589495374388767630513786983979995058238212252675614028445647835423322519866982976699475322621729665458602863486711732394368321940940624291614127722101300060324361809995764934885956706855963020875383903414505645280743
Signature type: SHA256withRSA
Signature OID: 1.2.840.113549.1.1.11
MD5 Fingerprint: FC AB 4A F1 F7 41 1B 4B A7 0E C2 FA 91 5D EE 8E
SHA-1 Fingerprint: 2C 97 60 EE 96 15 AD AB DE E0 E2 28 AE D9 1E 3D 4E BD EB DF
SHA-256 Fingerprint: 3F 3C F8 83 0A CC 96 53 0D 55 64 31 7F E4 80 AB 58 1D FC 55 EC 8F E5 5E 67 DD DB E1 FD B6 05 BE
```

Only interesting bit of this is the `SHA-256 Fingerprint`!
Let's remove all the spaces...

```javascript
"3F 3C F8 83 0A CC 96 53 0D 55 64 31 7F E4 80 AB 58 1D FC 55 EC 8F E5 5E 67 DD DB E1 FD B6 05 BE".replaceAll(
  " ",
  ""
);
```

Finally, let's create our generator...

```python
import hashlib
import hmac
import json

SIGNING_KEY = bytes.fromhex("3F3CF8830ACC96530D5564317FE480AB581DFC55EC8FE55E67DDDBE1FDB605BE")

def generate_x_signature(method: str, path: str, body) -> str:
    body_str = json.dumps(body, separators=(',', ':')) if body else "{}"
    string_to_sign = f"{method}/api{path}{body_str}"

    hmac_obj = hmac.new(SIGNING_KEY, string_to_sign.encode('utf-8'), hashlib.sha256)
    signature = hmac_obj.digest()

    return signature.hex().lower()


if __name__ == "__main__":
    signature = generate_x_signature("POST", "/flag", {"unmask_flag": True})
    print(f"X-Signature: {signature}")
```

## Get the flag!

```console
$ python signature.py
X-Signature: 440ba2925730d137259f297fd6fba02af2f7b6c414dd16a1ac336e9047cdb8f5

$ curl -X POST \
  -H "X-Signature: 440ba2925730d137259f297fd6fba02af2f7b6c414dd16a1ac336e9047cdb8f5" \
  -H "Content-Type: application/json" \
  -d '{"unmask_flag":true}' \
  https://sekaibank-api.chals.sekai.team/api/flag
SEKAI{are-you-ready-for-the-real-challenge?}
```

There we go! We can submit this now.
