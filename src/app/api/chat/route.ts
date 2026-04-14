import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful agricultural assistant for Crop Care Centre in Kashmir, India. Help farmers with questions about pesticides, insecticides, crop diseases, and spray schedules. Focus on Kashmir crops: Apple, Walnut, Saffron, Apricot. Keep responses simple and practical. Use ₹ for currency. You can recommend products, give spray timing advice based on Kashmir seasons, and help diagnose common crop diseases.`;

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    let assistantResponse: string;

    // Try LLM via z-ai-web-dev-sdk (only works in sandbox, gracefully degrades)
    try {
      const ZAI = (await import('z-ai-web-dev-sdk')).default;
      const client: any = await ZAI.create();
      const completion = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const result = completion as unknown as {
        choices?: { message?: { content?: string } }[];
      };
      assistantResponse =
        result.choices?.[0]?.message?.content ||
        generateFallbackResponse(message);
    } catch {
      // SDK not available outside sandbox — use fallback
      assistantResponse = generateFallbackResponse(message);
    }

    return NextResponse.json({ response: assistantResponse });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

function generateFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('apple') && (lower.includes('disease') || lower.includes('sick'))) {
    return 'For apple trees in Kashmir, common issues include apple scab, powdery mildew, and fire blight. I recommend using a fungicide spray schedule starting from green tip stage. Please visit our products section for suitable fungicides. You can also check our crop guides for detailed spray timing.';
  }
  if (lower.includes('spray') || lower.includes('schedule')) {
    return 'For Kashmir crops, the general spray schedule is:\n\n🍎 Apple: Start at green tip (March), repeat every 10-14 days\n🌰 Walnut: Spray during bud break and after petal fall\n🌸 Saffron: Generally disease-resistant, minimal spraying needed\n🍑 Apricot: Start spraying at pink bud stage\n\nAlways check weather conditions before spraying - avoid spraying if rain is expected within 6 hours or wind speed is above 20 km/h.';
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('₹')) {
    return 'You can check our latest prices in the Products section or use the Compare Prices feature to find the best deals. We offer competitive prices for all agricultural products in Kashmir.';
  }
  if (lower.includes('weather') || lower.includes('rain')) {
    return "Please check our Weather section for the latest 5-day forecast and spray advisory. We provide specific recommendations on whether it's safe to spray based on rain probability, wind speed, and temperature.";
  }
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('location')) {
    return 'You can reach us at:\n📍 Residency Road, Srinagar, J&K 190001\n📞 +91 194 234 5678\n📧 info@cropcarecentre.in\n\nHours: Mon-Sat 9AM-7PM, Sunday Closed';
  }
  if (lower.includes('walnut')) {
    return 'Walnut trees in Kashmir may face issues like walnut blight and husk fly. For prevention, use copper-based sprays during spring. Our crop guide has detailed information on walnut care throughout the season.';
  }
  if (lower.includes('saffron')) {
    return 'Saffron in Kashmir is relatively disease-resistant. The main concerns are corm rot and Fusarium wilt. Ensure well-drained soil and avoid overwatering. Crocus sativus requires specific care during planting in September-October.';
  }

  return 'Welcome to Crop Care Centre! I can help you with:\n\n🌿 Product recommendations for your crops\n🐛 Disease diagnosis and treatment\n📅 Spray schedules for Kashmir crops\n💰 Product pricing information\n📍 Store location and hours\n\nWhat would you like to know about?';
}
