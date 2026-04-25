use reqwest::blocking::Client;

pub fn fetch_html(url: &str) -> Result<String, String> {
    let client = Client::builder()
        .user_agent("Mozilla/5.0 (compatible; DOMCrawler/1.0)")
        .timeout(std::time::Duration::from_secs(10))
        .build()
        .map_err(|e| e.to_string())?;

    let response = client
        .get(url)
        .send()
        .map_err(|e| format!("Failed to fetch URL: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("HTTP error: {}", response.status()));
    }

    response
        .text()
        .map_err(|e| format!("Failed to read response: {}", e))
}
