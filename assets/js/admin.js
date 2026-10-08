/**
 * MemberGlut Admin JavaScript
 */

(function($) {
    'use strict';

    // Initialize when document is ready
    $(document).ready(function() {
        MemberGlutAdmin.init();
    });

    // Main admin object
    window.MemberGlutAdmin = {
        
        // Initialize admin functionality
        init: function() {
            this.bindEvents();
            this.initModals();
            this.initRoleSlugGeneration();
            this.initPlanSlugGeneration();
        },
        
        // Bind event listeners
        bindEvents: function() {
            // Create role form
            $(document).on('submit', '#memberglut-create-role-form', this.handleCreateRole);

            // Edit role buttons (use event delegation for dynamic content)
            $(document).on('click', '.edit-role', this.handleEditRole);

            // Delete role buttons (use event delegation for dynamic content)
            $(document).on('click', '.delete-role', this.handleDeleteRole);

            // Update role form
            $(document).on('submit', '#memberglut-edit-role-form', this.handleUpdateRole);

            // Assign role form
            $(document).on('submit', '#memberglut-assign-role-form', this.handleAssignRole);

            // Plan management
            $(document).on('submit', '#memberglut-create-plan-form', this.handleCreatePlan);
            $(document).on('click', '.edit-plan', this.handleEditPlan);
            $(document).on('click', '.delete-plan', this.handleDeletePlan);
            $(document).on('submit', '#memberglut-edit-plan-form', this.handleUpdatePlan);
            $(document).on('click', '.manage-features', this.handleManageFeatures);
            $(document).on('click', '#add-feature-btn', this.handleAddFeature);
            $(document).on('click', '.delete-feature', this.handleDeleteFeature);
            $(document).on('submit', '#memberglut-assign-plan-form', this.handleAssignPlan);

            // Modal close buttons
            $('.memberglut-modal-close').on('click', this.closeModal);

            // Toggle capabilities button
            $(document).on('click', '.toggle-capabilities', this.toggleCapabilities);

            // Close modal on backdrop click
            $('.memberglut-modal').on('click', function(e) {
                if (e.target === this) {
                    MemberGlutAdmin.closeModal();
                }
            });

            // Escape key to close modal
            $(document).on('keydown', function(e) {
                if (e.keyCode === 27) { // ESC key
                    MemberGlutAdmin.closeModal();
                }
            });
        },
        
        // Initialize modals
        initModals: function() {
            // Create modal container if it doesn't exist
            if ($('#memberglut-modal-container').length === 0) {
                $('body').append('<div id="memberglut-modal-container"></div>');
            }
        },
        
        // Generate role slug from role name
        initRoleSlugGeneration: function() {
            $('#role_name').on('input', function() {
                var name = $(this).val();
                var slug = name.toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, '_')
                    .substring(0, 30);

                $('#role_slug').val(slug);
            });
        },

        // Generate plan slug from plan name
        initPlanSlugGeneration: function() {
            $('#plan_name').on('input', function() {
                var name = $(this).val();
                var slug = name.toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, '_')
                    .substring(0, 30);

                $('#plan_slug').val(slug);
            });
        },
        
        // Handle create role form submission
        handleCreateRole: function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitButton = $form.find('button[type="submit"]');
            var originalText = $submitButton.text();
            
            // Check if form is disabled (limit reached)
            if ($form.hasClass('disabled') || $submitButton.prop('disabled')) {
                MemberGlutAdmin.showNotice('error', 'Role creation limit reached. Please upgrade to Pro for unlimited roles.');
                return;
            }
            
            // Disable form and show loading
            $form.addClass('memberglut-loading');
            $submitButton.text(memberglut_admin.strings.loading).prop('disabled', true);
            
            // Collect form data
            var formData = {
                action: 'memberglut_create_role',
                nonce: memberglut_admin.nonce,
                role_name: $('#role_name').val(),
                role_slug: $('#role_slug').val(),
                description: $('#role_description').val(),
                capabilities: {}
            };
            
            // Collect capabilities
            $form.find('input[name^="capabilities"]:checked').each(function() {
                var capName = $(this).attr('name').match(/\[(.*?)\]/)[1];
                formData.capabilities[capName] = true;
            });
            
            // Send AJAX request
            $.post(memberglut_admin.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', response.data.message);
                        $form[0].reset();
                        
                        // Reload page after short delay
                        setTimeout(function() {
                            location.reload();
                        }, 1500);
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                })
                .always(function() {
                    $form.removeClass('memberglut-loading');
                    $submitButton.text(originalText).prop('disabled', false);
                });
        },
        
        // Handle edit role button click
        handleEditRole: function(e) {
            e.preventDefault();
            
            var roleSlug = $(this).data('role');
            MemberGlutAdmin.openEditRoleModal(roleSlug);
        },
        
        // Handle delete role button click
        handleDeleteRole: function(e) {
            e.preventDefault();
            
            var roleSlug = $(this).data('role');
            var roleName = $(this).closest('.memberglut-role-card').find('h3').text();
            
            if (confirm(memberglut_admin.strings.confirm_delete.replace('%s', roleName))) {
                MemberGlutAdmin.deleteRole(roleSlug);
            }
        },
        
        // Handle update role form submission
        handleUpdateRole: function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitButton = $form.find('button[type="submit"]');
            var originalText = $submitButton.text();
            
            // Disable form and show loading
            $form.addClass('memberglut-loading');
            $submitButton.text(memberglut_admin.strings.loading).prop('disabled', true);
            
            // Collect form data
            var formData = {
                action: 'memberglut_update_role',
                nonce: memberglut_admin.nonce,
                role_slug: $('#edit_role_slug').val(),
                role_name: $('#edit_role_name').val(),
                description: $('#edit_role_description').val(),
                capabilities: {}
            };
            
            // Collect capabilities
            $form.find('input[name^="capabilities"]:checked').each(function() {
                var capName = $(this).attr('name').match(/\[(.*?)\]/)[1];
                formData.capabilities[capName] = true;
            });
            
            // Send AJAX request
            $.post(memberglut_admin.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', response.data.message);
                        MemberGlutAdmin.closeModal();
                        
                        // Reload page after short delay
                        setTimeout(function() {
                            location.reload();
                        }, 1500);
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                })
                .always(function() {
                    $form.removeClass('memberglut-loading');
                    $submitButton.text(originalText).prop('disabled', false);
                });
        },
        
        // Handle assign role form submission
        handleAssignRole: function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitButton = $form.find('button[type="submit"]');
            var originalText = $submitButton.text();
            
            // Disable form and show loading
            $form.addClass('memberglut-loading');
            $submitButton.text(memberglut_admin.strings.loading).prop('disabled', true);
            
            // Collect form data
            var formData = {
                action: 'memberglut_assign_role',
                nonce: memberglut_admin.nonce,
                user_id: $('#select_user').val(),
                role_slug: $('#select_role').val()
            };
            
            // Send AJAX request
            $.post(memberglut_admin.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', response.data.message);
                        $form[0].reset();
                        
                        // Reload page after short delay
                        setTimeout(function() {
                            location.reload();
                        }, 1500);
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                })
                .always(function() {
                    $form.removeClass('memberglut-loading');
                    $submitButton.text(originalText).prop('disabled', false);
                });
        },
        
        // Open edit role modal
        openEditRoleModal: function(roleSlug) {
            // Get role data via AJAX
            var requestData = {
                action: 'memberglut_get_role_data',
                nonce: memberglut_admin.nonce,
                role_slug: roleSlug
            };
            
            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.populateEditModal(response.data);
                        $('#memberglut-edit-role-modal').show();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },
        
        // Populate edit modal with role data
        populateEditModal: function(roleData) {
            $('#edit_role_slug').val(roleData.slug);
            $('#edit_role_name').val(roleData.name);
            $('#edit_role_description').val(roleData.description || '');
            
            // Clear and populate capabilities
            var $capGrid = $('#edit-capabilities-grid');
            $capGrid.empty();
            
            if (roleData.available_capabilities) {
                $.each(roleData.available_capabilities, function(capKey, capLabel) {
                    var checked = roleData.capabilities && roleData.capabilities[capKey] ? 'checked' : '';
                    var capHtml = '<label class="memberglut-capability-item">' +
                        '<input type="checkbox" name="capabilities[' + capKey + ']" value="1" ' + checked + '>' +
                        capLabel +
                        '</label>';
                    $capGrid.append(capHtml);
                });
            }
        },
        
        // Delete role
        deleteRole: function(roleSlug) {
            var requestData = {
                action: 'memberglut_delete_role',
                nonce: memberglut_admin.nonce,
                role_slug: roleSlug
            };

            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', response.data.message);

                        // Remove role card from DOM
                        $('.delete-role[data-role="' + roleSlug + '"]').closest('.memberglut-role-card').fadeOut(function() {
                            $(this).remove();
                        });
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },

        // Handle create plan form submission
        handleCreatePlan: function(e) {
            e.preventDefault();

            var $form = $(this);
            var $submitButton = $form.find('button[type="submit"]');

            // Check if form is disabled
            if ($form.hasClass('disabled') || $submitButton.prop('disabled')) {
                MemberGlutAdmin.showNotice('error', 'Plan limit reached. Please upgrade to Pro for unlimited plans.');
                return;
            }

            // Show loading
            $form.addClass('memberglut-loading');
            $submitButton.prop('disabled', true);

            // Collect form data
            var formData = $form.serialize() + '&action=memberglut_create_plan&nonce=' + memberglut_admin.nonce;
            var status = $form.find('input[name="plan_status"]').is(':checked') ? 'active' : 'inactive';
            formData += '&plan_status=' + status;

            // Send AJAX request
            $.post(memberglut_admin.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', 'Plan created successfully.');
                        location.reload();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                })
                .always(function() {
                    $form.removeClass('memberglut-loading');
                    $submitButton.prop('disabled', false);
                });
        },

        // Handle edit plan button click
        handleEditPlan: function(e) {
            e.preventDefault();

            var planId = $(this).data('plan');
            var requestData = {
                action: 'memberglut_get_plan',
                nonce: memberglut_admin.nonce,
                plan_id: planId
            };

            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        var plan = response.data;
                        $('#edit_plan_id').val(plan.id);
                        $('#edit_plan_name').val(plan.plan_name);
                        $('#edit_plan_description').val(plan.plan_description);
                        $('#edit_plan_price').val(plan.plan_price);
                        $('#edit_plan_billing_cycle').val(plan.plan_billing_cycle);
                        $('#edit_plan_duration').val(plan.plan_duration);
                        $('#edit_plan_trial_days').val(plan.plan_trial_days);
                        $('#edit_plan_color').val(plan.plan_color);
                        $('#edit_plan_icon').val(plan.plan_icon);
                        $('#edit_plan_order').val(plan.plan_order);
                        $('#edit_plan_status').prop('checked', plan.plan_status === 'active');
                        $('#memberglut-edit-plan-modal').show();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },

        // Handle delete plan button click
        handleDeletePlan: function(e) {
            e.preventDefault();

            if (!confirm(memberglut_admin.strings.confirm_delete)) {
                return;
            }

            var planId = $(this).data('plan');
            var requestData = {
                action: 'memberglut_delete_plan',
                nonce: memberglut_admin.nonce,
                plan_id: planId
            };

            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', 'Plan deleted successfully.');
                        location.reload();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },

        // Handle update plan form submission
        handleUpdatePlan: function(e) {
            e.preventDefault();

            var $form = $(this);
            var $submitButton = $form.find('button[type="submit"]');

            // Show loading
            $form.addClass('memberglut-loading');
            $submitButton.prop('disabled', true);

            // Collect form data
            var formData = $form.serialize() + '&action=memberglut_update_plan&nonce=' + memberglut_admin.nonce;
            var status = $('#edit_plan_status').is(':checked') ? 'active' : 'inactive';
            formData += '&plan_status=' + status;

            // Send AJAX request
            $.post(memberglut_admin.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', 'Plan updated successfully.');
                        location.reload();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                })
                .always(function() {
                    $form.removeClass('memberglut-loading');
                    $submitButton.prop('disabled', false);
                });
        },

        // Handle manage features button click
        handleManageFeatures: function(e) {
            e.preventDefault();

            var planId = $(this).data('plan');
            var planName = $(this).data('plan-name');

            $('#features_plan_id').val(planId);
            $('#memberglut-features-modal').find('.memberglut-modal-header h2').text('Manage Features: ' + planName);
            $('#memberglut-features-modal').show();

            MemberGlutAdmin.loadPlanFeatures(planId);
        },

        // Load plan features
        loadPlanFeatures: function(planId) {
            var requestData = {
                action: 'memberglut_get_plan_features',
                nonce: memberglut_admin.nonce,
                plan_id: planId
            };

            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        var features = response.data;
                        var html = '';

                        if (features.length === 0) {
                            html = '<p>No features added yet.</p>';
                        } else {
                            $.each(features, function(i, feature) {
                                html += '<div class="memberglut-feature-item">' +
                                    '<div class="memberglut-feature-item-left">' +
                                    '<span class="dashicons ' + feature.feature_icon + '"></span>' +
                                    '<span>' + feature.feature_name + '</span>' +
                                    '</div>' +
                                    '<button class="button button-small button-link-delete delete-feature" data-feature="' + feature.id + '">' +
                                    'Delete' +
                                    '</button>' +
                                    '</div>';
                            });
                        }

                        $('#features-container').html(html);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },

        // Handle add feature button click
        handleAddFeature: function(e) {
            e.preventDefault();

            var planId = $('#features_plan_id').val();
            var featureName = $('#feature_name').val();
            var featureIcon = $('#feature_icon').val();

            if (!featureName) {
                MemberGlutAdmin.showNotice('error', 'Please enter a feature name.');
                return;
            }

            var requestData = {
                action: 'memberglut_add_plan_feature',
                nonce: memberglut_admin.nonce,
                plan_id: planId,
                feature_name: featureName,
                feature_icon: featureIcon
            };

            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        $('#feature_name').val('');
                        MemberGlutAdmin.loadPlanFeatures(planId);
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },

        // Handle delete feature button click
        handleDeleteFeature: function(e) {
            e.preventDefault();

            var featureId = $(this).data('feature');
            var planId = $('#features_plan_id').val();

            var requestData = {
                action: 'memberglut_delete_plan_feature',
                nonce: memberglut_admin.nonce,
                feature_id: featureId
            };

            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.loadPlanFeatures(planId);
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        },

        // Handle assign plan form submission
        handleAssignPlan: function(e) {
            e.preventDefault();

            var $form = $(this);
            var $submitButton = $form.find('button[type="submit"]');

            // Show loading
            $form.addClass('memberglut-loading');
            $submitButton.prop('disabled', true);

            // Collect form data
            var formData = $form.serialize() + '&action=memberglut_assign_user_plan&nonce=' + memberglut_admin.nonce;

            // Send AJAX request
            $.post(memberglut_admin.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', 'Plan assigned successfully.');
                        MemberGlutAdmin.closeModal();
                        $form[0].reset();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                })
                .always(function() {
                    $form.removeClass('memberglut-loading');
                    $submitButton.prop('disabled', false);
                });
        },
        
        // Close modal
        closeModal: function() {
            $('.memberglut-modal').hide();
        },
        
        // Toggle capabilities visibility
        toggleCapabilities: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var roleSlug = $button.data('role');
            var $capsList = $('#capabilities-' + roleSlug);
            
            if ($capsList.hasClass('expanded')) {
                // Hide capabilities
                $capsList.removeClass('expanded').slideUp(200);
                $button.text(memberglut_admin.strings.show_capabilities || 'Show Capabilities');
            } else {
                // Show capabilities
                $capsList.addClass('expanded').slideDown(200);
                $button.text(memberglut_admin.strings.hide_capabilities || 'Hide Capabilities');
            }
        },
        
        // Show notice
        showNotice: function(type, message) {
            // Remove existing notices
            $('.memberglut-notice').remove();
            
            var noticeClass = type === 'success' ? 'notice-success' : 'notice-error';
            var noticeHtml = '<div class="notice ' + noticeClass + ' is-dismissible memberglut-notice">' +
                '<p>' + message + '</p>' +
                '<button type="button" class="notice-dismiss">' +
                '<span class="screen-reader-text">Dismiss this notice.</span>' +
                '</button>' +
                '</div>';
            
            // Insert notice after page title
            $('.wrap h1').after(noticeHtml);
            
            // Handle dismiss button
            $('.notice-dismiss').on('click', function() {
                $(this).closest('.notice').fadeOut();
            });
            
            // Auto-hide success notices after 5 seconds
            if (type === 'success') {
                setTimeout(function() {
                    $('.memberglut-notice.notice-success').fadeOut();
                }, 5000);
            }
        },
        
        // Initialize tooltips (if needed)
        initTooltips: function() {
            $('[data-tooltip]').each(function() {
                var $element = $(this);
                var tooltip = $element.data('tooltip');
                
                $element.on('mouseenter', function() {
                    var $tooltip = $('<div class="memberglut-tooltip">' + tooltip + '</div>');
                    $('body').append($tooltip);
                    
                    var offset = $element.offset();
                    $tooltip.css({
                        top: offset.top - $tooltip.outerHeight() - 10,
                        left: offset.left + ($element.outerWidth() / 2) - ($tooltip.outerWidth() / 2)
                    });
                });
                
                $element.on('mouseleave', function() {
                    $('.memberglut-tooltip').remove();
                });
            });
        },
        
        // Validate form
        validateForm: function($form) {
            var isValid = true;
            var $requiredFields = $form.find('[required]');
            
            $requiredFields.each(function() {
                var $field = $(this);
                var value = $field.val().trim();
                
                if (!value) {
                    $field.addClass('error');
                    isValid = false;
                } else {
                    $field.removeClass('error');
                }
            });
            
            return isValid;
        },
        
        // Format role slug
        formatSlug: function(text) {
            return text.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 30);
        },
        
        // Debounce function
        debounce: function(func, wait) {
            var timeout;
            return function executedFunction() {
                var context = this;
                var args = arguments;
                var later = function() {
                    timeout = null;
                    func.apply(context, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };
    
    // Handle dynamic content loading
    $(document).on('click', '.memberglut-load-more', function(e) {
        e.preventDefault();
        
        var $button = $(this);
        var page = $button.data('page') || 1;
        var originalText = $button.text();
        
        $button.text(memberglut_admin.strings.loading).prop('disabled', true);
        
        var requestData = {
            action: 'memberglut_load_more_content',
            nonce: memberglut_admin.nonce,
            page: page + 1,
            type: $button.data('type') || 'members'
        };
        
        $.post(memberglut_admin.ajax_url, requestData)
            .done(function(response) {
                if (response.success && response.data.html) {
                    $button.closest('.memberglut-content-container').append(response.data.html);
                    $button.data('page', page + 1);
                    
                    if (!response.data.has_more) {
                        $button.hide();
                    }
                } else {
                    MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                }
            })
            .fail(function() {
                MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
            })
            .always(function() {
                $button.text(originalText).prop('disabled', false);
            });
    });
    
    // Handle search functionality
    $(document).on('input', '.memberglut-search', MemberGlutAdmin.debounce(function() {
        var $input = $(this);
        var searchTerm = $input.val().trim();
        var searchType = $input.data('search-type') || 'members';
        
        if (searchTerm.length < 2) {
            return;
        }
        
        var requestData = {
            action: 'memberglut_search',
            nonce: memberglut_admin.nonce,
            search: searchTerm,
            type: searchType
        };
        
        $.post(memberglut_admin.ajax_url, requestData)
            .done(function(response) {
                if (response.success) {
                    var $container = $input.closest('.memberglut-search-container').find('.memberglut-search-results');
                    $container.html(response.data.html);
                }
            });
    }, 300));
    
    // Handle bulk actions
    $(document).on('change', '.memberglut-bulk-select-all', function() {
        var checked = $(this).prop('checked');
        $('.memberglut-bulk-select').prop('checked', checked);
    });
    
    $(document).on('click', '.memberglut-bulk-action-submit', function(e) {
        e.preventDefault();
        
        var action = $('.memberglut-bulk-action-select').val();
        var selectedItems = $('.memberglut-bulk-select:checked').map(function() {
            return $(this).val();
        }).get();
        
        if (!action || selectedItems.length === 0) {
            alert('Please select an action and at least one item.');
            return;
        }
        
        if (confirm('Are you sure you want to perform this action on ' + selectedItems.length + ' item(s)?')) {
            var requestData = {
                action: 'memberglut_bulk_action',
                nonce: memberglut_admin.nonce,
                bulk_action: action,
                items: selectedItems
            };
            
            $.post(memberglut_admin.ajax_url, requestData)
                .done(function(response) {
                    if (response.success) {
                        MemberGlutAdmin.showNotice('success', response.data.message);
                        location.reload();
                    } else {
                        MemberGlutAdmin.showNotice('error', response.data || memberglut_admin.strings.error);
                    }
                })
                .fail(function() {
                    MemberGlutAdmin.showNotice('error', memberglut_admin.strings.error);
                });
        }
    });

    // Settings page functionality
    $('#memberglut_whole_site_login_control').on('change', function() {
        $('#memberglut_whole_site_allowed_pages_row').toggle(this.checked);
    });

    // Documentation modal
    $('#memberglut-show-docs').on('click', function() {
        $('#memberglut-docs-modal').show();
    });

    // Documentation tabs
    $('.memberglut-docs-tab').on('click', function() {
        var tab = $(this).data('tab');

        $('.memberglut-docs-tab').removeClass('active');
        $(this).addClass('active');

        $('.memberglut-docs-content').removeClass('active').hide();
        $('#' + tab + '-tab').addClass('active').show();
    });

})(jQuery);