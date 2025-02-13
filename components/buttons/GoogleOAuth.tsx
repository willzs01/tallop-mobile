import React from 'react'
import { Linking } from 'react-native'
import { useOAuth } from '@clerk/clerk-expo'

import { TouchableOpacity, View, Text } from 'react-native'

// const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
//         redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
//       })

//       if (createdSessionId) {
//         setActive!({ session: createdSessionId })
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error('OAuth error', err)
//     }
//   }, [])


const GoogleOAuth = () => {
  return (
    <>
    <TouchableOpacity >
        <View className="w-6 h-6 items-center justify-center">
            <View className="w-5 h-5 bg-white rounded-full overflow-hidden items-center justify-center">
                <Text className="text-sm font-bold text-blue-500">G</Text>
            </View>
        </View>
    </TouchableOpacity>
    </>
  )
}

export default GoogleOAuth
