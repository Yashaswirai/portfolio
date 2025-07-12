// Utility function to generate placeholder images
export const generatePlaceholderImage = (width = 600, height = 400, text = 'Project Image') => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = width
  canvas.height = height
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#0ea5e9')
  gradient.addColorStop(1, '#8b5cf6')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  // Add text
  ctx.fillStyle = 'white'
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, height / 2)
  
  return canvas.toDataURL()
}

// Pre-generated placeholder images for projects
export const projectPlaceholders = {
  cuberto: generatePlaceholderImage(600, 400, 'Cuberto Clone'),
  cynthia: generatePlaceholderImage(600, 400, 'Cynthia Ugwu Clone'),
  ecommerce: generatePlaceholderImage(600, 400, 'E-commerce App')
}
