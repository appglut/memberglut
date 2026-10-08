/**
 * MemberGlut Frontend JavaScript
 * Handles login and registration forms with AJAX and validation
 */
(function($) {
    'use strict';
    
    // Initialize when document is ready
    $(document).ready(function() {
        initLoginForm();
        initRegisterForm();
        initPasswordStrengthMeter();
    });
    
    /**
     * Initialize login form
     */
    function initLoginForm() {
        $('.memberglut-login-form').on('submit', function(e) {
            // Check if AJAX is available and enabled
            if (typeof memberglut_ajax === 'undefined') {
                return; // Allow normal form submission
            }
            
            e.preventDefault();
            handleLoginSubmission($(this));
        });
        
        // FALLBACK: If no MemberGlut forms found, try to enhance any login form
        if ($('.memberglut-login-form').length === 0) {
            // Look for forms that might be login forms
            $('form').each(function() {
                var $form = $(this);
                var hasUsernameField = $form.find('input[name="log"], input[name="user_login"], input[name="username"]').length > 0;
                var hasPasswordField = $form.find('input[name="pwd"], input[name="user_pass"], input[name="password"]').length > 0;
                
                if (hasUsernameField && hasPasswordField) {
                    $form.addClass('memberglut-fallback-form');
                    
                    $form.on('submit', function(e) {
                        // Check if AJAX is available
                        if (typeof memberglut_ajax === 'undefined') {
                            return;
                        }
                        
                        e.preventDefault();
                        handleFallbackLoginSubmission($form);
                    });
                }
            });
        }
    }
    
    /**
     * Initialize registration form
     */
    function initRegisterForm() {
        $('.memberglut-register-form').on('submit', function(e) {
            e.preventDefault();
            handleRegistrationSubmission($(this));
        });
    }
    
    /**
     * Handle login form submission
     */
    function handleLoginSubmission($form) {
        var $submitBtn = $form.find('button[type="submit"]');
        var originalText = $submitBtn.text();
        
        // Get form data
        var formData = {
            action: 'memberglut_ajax_login',
            username: $form.find('input[name="username"]').val(),
            password: $form.find('input[name="password"]').val(),
            remember: $form.find('input[name="remember"]').is(':checked'),
            nonce: memberglut_ajax.nonce
        };
        
        // Validate form
        var validation = validateLoginForm(formData);
        if (!validation.valid) {
            showFormMessage($form, validation.message, 'error');
            return;
        }
        
        // Set loading state
        setButtonLoading($submitBtn, memberglut_ajax.messages.processing);
        clearFormMessages($form);
        
        // Submit via AJAX
        $.ajax({
            url: memberglut_ajax.ajax_url,
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success) {
                    showFormMessage($form, response.data.message, 'success');
                    
                    // Redirect after short delay
                    setTimeout(function() {
                        if (response.data.redirect_url) {
                            window.location.href = response.data.redirect_url;
                        } else {
                            window.location.reload();
                        }
                    }, 1500);
                } else {
                    showFormMessage($form, response.data.message, 'error');
                    resetButtonLoading($submitBtn, originalText);
                }
            },
            error: function(xhr, status, error) {
                showFormMessage($form, memberglut_ajax.messages.error, 'error');
                resetButtonLoading($submitBtn, originalText);
            }
        });
    }
    
    /**
     * Handle registration form submission
     */
    function handleRegistrationSubmission($form) {
        var $submitBtn = $form.find('button[type="submit"]');
        var originalText = $submitBtn.text();
        
        // Get form data
        var formData = {
            action: 'memberglut_ajax_register',
            username: $form.find('input[name="username"]').val(),
            email: $form.find('input[name="email"]').val(),
            password: $form.find('input[name="password"]').val(),
            first_name: $form.find('input[name="first_name"]').val(),
            last_name: $form.find('input[name="last_name"]').val(),
            default_role: $form.find('input[name="default_role"]').val(),
            nonce: memberglut_ajax.nonce
        };
        
        // Validate form
        var validation = validateRegistrationForm(formData);
        if (!validation.valid) {
            showFormMessage($form, validation.message, 'error');
            return;
        }
        
        // Set loading state
        setButtonLoading($submitBtn, memberglut_ajax.messages.processing);
        clearFormMessages($form);
        
        // Submit via AJAX
        $.ajax({
            url: memberglut_ajax.ajax_url,
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success) {
                    showFormMessage($form, response.data.message, 'success');
                    
                    // Clear form
                    $form[0].reset();
                    updatePasswordStrength('', $('.memberglut-password-strength'));
                    
                    // Redirect after short delay
                    setTimeout(function() {
                        if (response.data.redirect_url) {
                            window.location.href = response.data.redirect_url;
                        } else {
                            window.location.reload();
                        }
                    }, 2000);
                } else {
                    showFormMessage($form, response.data.message, 'error');
                    resetButtonLoading($submitBtn, originalText);
                }
            },
            error: function() {
                showFormMessage($form, memberglut_ajax.messages.error, 'error');
                resetButtonLoading($submitBtn, originalText);
            }
        });
    }
    
    /**
     * Validate login form
     */
    function validateLoginForm(data) {
        if (!data.username || data.username.trim() === '') {
            return { valid: false, message: 'Please enter your username or email.' };
        }
        
        if (!data.password || data.password.trim() === '') {
            return { valid: false, message: 'Please enter your password.' };
        }
        
        return { valid: true };
    }
    
    /**
     * Validate registration form
     */
    function validateRegistrationForm(data) {
        // Username validation
        if (!data.username || data.username.trim() === '') {
            return { valid: false, message: 'Please enter a username.' };
        }
        
        if (data.username.length < 3) {
            return { valid: false, message: 'Username must be at least 3 characters long.' };
        }
        
        if (!/^[a-zA-Z0-9_-]+$/.test(data.username)) {
            return { valid: false, message: 'Username can only contain letters, numbers, hyphens, and underscores.' };
        }
        
        // Email validation
        if (!data.email || data.email.trim() === '') {
            return { valid: false, message: 'Please enter an email address.' };
        }
        
        if (!isValidEmail(data.email)) {
            return { valid: false, message: 'Please enter a valid email address.' };
        }
        
        // Password validation
        if (!data.password || data.password.trim() === '') {
            return { valid: false, message: 'Please enter a password.' };
        }
        
        var passwordStrength = calculatePasswordStrength(data.password);
        if (passwordStrength < 2) {
            return { valid: false, message: 'Password is too weak. Please choose a stronger password.' };
        }
        
        return { valid: true };
    }
    
    /**
     * Validate email format
     */
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show form message
     */
    function showFormMessage($form, message, type) {
        var messageClass = type === 'error' ? 'memberglut-error' : 'memberglut-success';
        var messageHtml = '<div class="' + messageClass + '">' + message + '</div>';
        
        // Remove existing messages
        clearFormMessages($form);
        
        // Add new message
        $form.prepend(messageHtml);
        
        // Scroll to message
        $('html, body').animate({
            scrollTop: $form.offset().top - 20
        }, 300);
    }
    
    /**
     * Clear form messages
     */
    function clearFormMessages($form) {
        $form.find('.memberglut-error, .memberglut-success').remove();
    }
    
    /**
     * Set button loading state
     */
    function setButtonLoading($button, loadingText) {
        $button.addClass('memberglut-btn-loading');
        $button.prop('disabled', true);
        $button.data('original-text', $button.text());
        $button.text(loadingText);
    }
    
    /**
     * Reset button loading state
     */
    function resetButtonLoading($button, originalText) {
        $button.removeClass('memberglut-btn-loading');
        $button.prop('disabled', false);
        $button.text(originalText || $button.data('original-text'));
    }
    
    /**
     * Initialize password strength meter
     */
    function initPasswordStrengthMeter() {
        var $passwordInputs = $('.memberglut-register-form input[name="password"]');
        
        $passwordInputs.each(function() {
            var $input = $(this);
            var $container = $input.closest('.memberglut-form-row');
            
            // Add password strength indicator
            var strengthHtml = 
                '<div class="memberglut-password-strength">' +
                    '<div class="memberglut-password-strength-bar"></div>' +
                '</div>' +
                '<div class="memberglut-password-strength-text"></div>';
            
            $container.append(strengthHtml);
            
            var $strengthContainer = $container.find('.memberglut-password-strength');
            var $strengthText = $container.find('.memberglut-password-strength-text');
            
            // Update strength on input
            $input.on('input', function() {
                updatePasswordStrength($(this).val(), $strengthContainer, $strengthText);
            });
        });
    }
    
    /**
     * Update password strength indicator
     */
    function updatePasswordStrength(password, $strengthContainer, $strengthText) {
        if (!password) {
            $strengthContainer.removeClass('memberglut-password-strength-weak memberglut-password-strength-medium memberglut-password-strength-strong');
            if ($strengthText) $strengthText.text('');
            return;
        }
        
        var strength = calculatePasswordStrength(password);
        var strengthClass = '';
        var strengthLabel = '';
        
        switch (strength) {
            case 1:
                strengthClass = 'memberglut-password-strength-weak';
                strengthLabel = 'Weak';
                break;
            case 2:
                strengthClass = 'memberglut-password-strength-medium';
                strengthLabel = 'Medium';
                break;
            case 3:
                strengthClass = 'memberglut-password-strength-strong';
                strengthLabel = 'Strong';
                break;
            default:
                strengthClass = '';
                strengthLabel = '';
        }
        
        // Update classes
        $strengthContainer.removeClass('memberglut-password-strength-weak memberglut-password-strength-medium memberglut-password-strength-strong');
        if (strengthClass) {
            $strengthContainer.addClass(strengthClass);
        }
        
        // Update text
        if ($strengthText) {
            $strengthText.text(strengthLabel ? 'Password strength: ' + strengthLabel : '');
        }
    }
    
    /**
     * Calculate password strength
     * Returns: 0 = very weak, 1 = weak, 2 = medium, 3 = strong
     */
    function calculatePasswordStrength(password) {
        if (!password) return 0;
        
        var score = 0;
        
        // Length bonus
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        
        // Character variety bonus
        if (/[a-z]/.test(password)) score += 1; // lowercase
        if (/[A-Z]/.test(password)) score += 1; // uppercase
        if (/[0-9]/.test(password)) score += 1; // numbers
        if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special characters
        
        // Common patterns penalty
        if (/(.)\1{2,}/.test(password)) score -= 1; // repeated characters
        if (/123|abc|qwe|asd|zxc/i.test(password)) score -= 1; // common sequences
        
        // Convert score to strength level (0-3)
        if (score <= 2) return 1; // weak
        if (score <= 4) return 2; // medium
        return 3; // strong
    }
    
    /**
     * Real-time form validation
     */
    function initRealTimeValidation() {
        // Username validation
        $('.memberglut-register-form input[name="username"]').on('blur', function() {
            var $input = $(this);
            var username = $input.val();
            
            if (username && username.length < 3) {
                showFieldError($input, 'Username must be at least 3 characters long.');
            } else if (username && !/^[a-zA-Z0-9_-]+$/.test(username)) {
                showFieldError($input, 'Username can only contain letters, numbers, hyphens, and underscores.');
            } else {
                clearFieldError($input);
            }
        });
        
        // Email validation
        $('.memberglut-register-form input[name="email"]').on('blur', function() {
            var $input = $(this);
            var email = $input.val();
            
            if (email && !isValidEmail(email)) {
                showFieldError($input, 'Please enter a valid email address.');
            } else {
                clearFieldError($input);
            }
        });
    }
    
    /**
     * Show field-specific error
     */
    function showFieldError($input, message) {
        clearFieldError($input);
        $input.addClass('memberglut-field-error');
        $input.after('<div class="memberglut-field-error-message">' + message + '</div>');
    }
    
    /**
     * Clear field-specific error
     */
    function clearFieldError($input) {
        $input.removeClass('memberglut-field-error');
        $input.next('.memberglut-field-error-message').remove();
    }
    
    // Initialize real-time validation
    $(document).ready(function() {
        initRealTimeValidation();
    });
    
    /**
     * Handle form input animations
     */
    function initFormAnimations() {
        $('.memberglut-form-container input[type="text"], .memberglut-form-container input[type="password"], .memberglut-form-container input[type="email"]').each(function() {
            var $input = $(this);
            var $label = $input.prev('label');
            
            // Add focus/blur animations
            $input.on('focus', function() {
                $label.addClass('memberglut-label-focused');
            });
            
            $input.on('blur', function() {
                if (!$(this).val()) {
                    $label.removeClass('memberglut-label-focused');
                }
            });
            
            // Set initial state for pre-filled inputs
            if ($input.val()) {
                $label.addClass('memberglut-label-focused');
            }
        });
    }
    
    // Initialize form animations
    $(document).ready(function() {
        initFormAnimations();
    });
    
    /**
     * Handle fallback login form submission
     */
    function handleFallbackLoginSubmission($form) {
        var $submitBtn = $form.find('input[type="submit"], button[type="submit"]').first();
        var originalText = $submitBtn.val() || $submitBtn.text();
        
        // Try to get username/password from common field names
        var username = $form.find('input[name="log"], input[name="user_login"], input[name="username"]').val();
        var password = $form.find('input[name="pwd"], input[name="user_pass"], input[name="password"]').val();
        var remember = $form.find('input[name="rememberme"], input[name="remember"]').is(':checked');
        
        // Get form data
        var formData = {
            action: 'memberglut_ajax_login',
            username: username,
            password: password,
            remember: remember,
            nonce: memberglut_ajax.nonce
        };
        
        // Validate form
        var validation = validateLoginForm(formData);
        if (!validation.valid) {
            showFormMessage($form, validation.message, 'error');
            return;
        }
        
        // Set loading state
        setButtonLoading($submitBtn, memberglut_ajax.messages.processing);
        clearFormMessages($form);
        
        // Submit via AJAX
        $.ajax({
            url: memberglut_ajax.ajax_url,
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success) {
                    showFormMessage($form, response.data.message, 'success');
                    
                    // Redirect after short delay
                    setTimeout(function() {
                        if (response.data.redirect_url) {
                            window.location.href = response.data.redirect_url;
                        } else {
                            window.location.reload();
                        }
                    }, 1500);
                } else {
                    showFormMessage($form, response.data.message, 'error');
                    resetButtonLoading($submitBtn, originalText);
                }
            },
            error: function(xhr, status, error) {
                showFormMessage($form, memberglut_ajax.messages.error, 'error');
                resetButtonLoading($submitBtn, originalText);
            }
        });
    }

})(jQuery);