{{ ... }}
## Building for Production

### 1. Build the Spatial Version
```bash
npm run build:avp
```
This creates an optimized production build in `.next/webspatial/avp`

### 2. Package for TestFlight

#### Prerequisites
1. **Apple Developer Account** ($99/year)
2. **App Store Connect Access**
3. **Valid Bundle ID** (com.gtxr.app)
4. **Signing Certificate & Provisioning Profile**

#### Setup Environment Variables
Create or update `.env.local`:
```bash
# Apple Developer Credentials
APPLE_ID=your-apple-id@email.com
APPLE_TEAM_ID=YOUR_TEAM_ID
APP_SPECIFIC_PASSWORD=xxxx-xxxx-xxxx-xxxx  # Generate at appleid.apple.com

# App Configuration
BUNDLE_ID=com.gtxr.app
APP_NAME="GTXR"
APP_VERSION=1.0.0
BUILD_NUMBER=1
```

#### Package the App
```bash
# This creates a .ipa file for TestFlight
npm run package:avp
```

The command will:
- Build the visionOS app shell
- Embed your spatial web app
- Sign with your developer certificate
- Create `gtxr-visionos.ipa` in `dist/`

### 3. Upload to TestFlight

#### Method 1: Using Transporter (Recommended)
1. Download **Transporter** from Mac App Store
2. Sign in with your Apple ID
3. Drag the `.ipa` file into Transporter
4. Click **Deliver**

#### Method 2: Using Command Line
```bash
# Install Xcode command line tools if needed
xcode-select --install

# Upload to App Store Connect
xcrun altool --upload-app \
  --type ios \
  --file dist/gtxr-visionos.ipa \
  --username $APPLE_ID \
  --password $APP_SPECIFIC_PASSWORD
```

### 4. Configure TestFlight

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select your app
3. Navigate to **TestFlight** tab
4. Wait for build processing (10-30 minutes)
5. Once processed:
   - Add **Internal Testers** (up to 100)
   - Create **External Testing Group** (up to 10,000 testers)
   - Add tester emails
   - Submit for **Beta App Review** (24-48 hours)

### 5. TestFlight Distribution

#### For Internal Testing (Immediate)
- Testers receive email invitation
- Download TestFlight on Vision Pro
- Install and test the app

#### For External Testing (After Review)
- Create public TestFlight link
- Share with beta testers
- Collect feedback via TestFlight

## Publishing to App Store

### 1. Prepare for Submission

#### App Store Assets
Create the following in `app-store-assets/`:

**Screenshots** (Required):
- 2732 x 2048px - Vision Pro landscape
- At least 3, maximum 10 screenshots
- Show key features and spatial UI

**App Icon**:
- 1024 x 1024px PNG
- No transparency
- No rounded corners (Apple adds them)

**App Preview Video** (Optional):
- 1920 x 1080px or 1920 x 886px
- 15-30 seconds
- .mov or .mp4 format

#### Metadata
Prepare the following information:

```yaml
App Information:
  Name: GTXR - Georgia Tech XR
  Subtitle: Extended Reality at Georgia Tech
  Category: Education
  Age Rating: 4+
  
Description:
  Primary: |
    Experience the future of extended reality with GTXR, 
    Georgia Tech's premier XR organization. Explore our 
    projects, events, and innovations in spatial computing.
  
  Keywords: XR, VR, AR, Georgia Tech, Spatial Computing, Vision Pro
  
  What's New: |
    Version 1.0.0
    - Initial release for visionOS
    - Spatial navigation and interactions
    - Project showcase in 3D
    - Event calendar with spatial UI
  
Support:
  URL: https://www.gtxr.club/support
  Email: support@gtxr.club
  
Privacy Policy: https://www.gtxr.club/privacy
Terms of Service: https://www.gtxr.club/terms
```

### 2. Submit for Review

#### In App Store Connect:

1. **Create New App Version**
   - Go to **My Apps** → Select your app
   - Click **+** next to **visionOS App**
   - Enter version number

2. **Upload Build**
   - Select the build from TestFlight
   - Or upload new production build

3. **Fill App Information**
   - Add screenshots and app preview
   - Enter description and keywords
   - Set pricing (Free/Paid)
   - Select availability (countries/regions)

4. **App Review Information**
   - Demo account (if needed)
   - Notes for reviewer
   - Contact information

5. **Submit for Review**
   - Review all information
   - Click **Submit for Review**
   - Wait 24-48 hours (typically)

### 3. Post-Launch

#### Monitor Performance
```bash
# Check crash reports and analytics
npm run analytics:avp
```

#### Update Process
For updates:
1. Increment version in `package.json`
2. Build new version: `npm run build:avp`
3. Package: `npm run package:avp`
4. Upload to App Store Connect
5. Submit for review

## Production Checklist

### Before TestFlight
- [ ] Test all features in simulator
- [ ] Verify spatial interactions work
- [ ] Check performance metrics
- [ ] Review console for errors
- [ ] Test on different Vision Pro configurations
- [ ] Ensure HTTPS for all API calls
- [ ] Implement proper error handling

### Before App Store
- [ ] Complete beta testing feedback
- [ ] Optimize bundle size (<100MB recommended)
- [ ] Implement analytics tracking
- [ ] Add crash reporting (Sentry/Bugsnag)
- [ ] Create support documentation
- [ ] Prepare marketing materials
- [ ] Set up app website landing page

### Legal Requirements
- [ ] Privacy Policy URL active
- [ ] Terms of Service URL active
- [ ] GDPR compliance (if applicable)
- [ ] Copyright attributions
- [ ] Third-party licenses

## Troubleshooting Deployment

### Common Issues

#### "Invalid Bundle ID"
```bash
# Ensure Bundle ID matches App Store Connect
# Update in manifest.webmanifest and package.json
```

#### "Missing Compliance"
- Add export compliance in App Store Connect
- For apps without encryption: Self-Classification Report

#### "Invalid Signature"
```bash
# Re-download provisioning profiles
npm run certificates:refresh
npm run package:avp
```

#### Build Rejection Reasons
- **Performance Issues**: Optimize images and code splitting
- **Crashes**: Test thoroughly, add error boundaries
- **UI Issues**: Follow Apple's Human Interface Guidelines
- **Content**: Ensure educational content is appropriate
